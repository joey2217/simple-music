import { app, session } from 'electron'
import https from 'https'

const filter = {
  urls: ['https://wapi.kuwo.cn/*'],
}

let csrf = ''
let reqCookie = ''
const HEADER_COOKIE_KEY = 'Cookie'
const CSRF_KEY = 'csrf'
const COOKIE_HEADER_KEY = 'Set-Cookie'
const COOKIE_KEY = 'kw_token'
const KUWO_URL = 'https://wapi.kuwo.cn/'

// kw_token=2GTRO51Y2VM; path=/; expires=Fri, 17 Feb 2023 07:31:18 GMT
function setToken(cookies: string[]) {
  if (cookies.length > 0) {
    cookies.forEach((cookieStr) => {
      const arr = cookieStr.split(';')
      const cookie = arr[0]
      const expires = arr[2]
      const [, expirationDateStr] = expires.split('=')
      const expirationDate = new Date(expirationDateStr).getTime()
      const [key, value] = cookie.split('=')
      if (key === COOKIE_KEY) {
        csrf = value
        reqCookie = cookie
        session.defaultSession.cookies
          .set({
            url: KUWO_URL,
            name: key,
            value,
            expirationDate,
          })
          .then(
            () => {
              csrf = value
            },
            (error) => {
              console.error('error')
            }
          )
      }
    })
  }
}
// 初始化cookies
export function initCSRF() {
  return new Promise((resolve, reject) => {
    https
      .get(KUWO_URL + '/favicon.ico?v=1', (res) => {
        if (res.headers && res.headers['set-cookie']) {
          setToken(res.headers['set-cookie'])
          resolve(csrf)
        }
        reject()
      })
      .on('error', (e) => {
        console.error(e, 'error')
        reject()
      })
  })
}

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      if (csrf) {
        details.requestHeaders[CSRF_KEY] = csrf
        details.requestHeaders[HEADER_COOKIE_KEY] = reqCookie
        details.requestHeaders['origin'] = KUWO_URL
        details.requestHeaders['Referer'] = KUWO_URL
      }
      callback({ requestHeaders: details.requestHeaders })
    }
  )
  session.defaultSession.webRequest.onCompleted(filter, (details) => {
    if (details.responseHeaders && details.responseHeaders[COOKIE_HEADER_KEY]) {
      setToken(details.responseHeaders[COOKIE_HEADER_KEY])
    }
  })
})

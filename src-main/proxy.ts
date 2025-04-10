import { app, session } from 'electron'
import log from 'electron-log/main'

const headers = {
  Referer: 'https://m.music.migu.cn/v4/',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  By: '4f09e01c83d69100c363c33aecfef9f8',
  channel: '014000D',
  Cookie: 'SESSION=MmU0ZDNlZWMtMjgwNS00ODcwLTk0MTMtZmU5YjVmY2UzNmM5',
}
const secret = '5pa55qC86Z+z5LmQ54mb6YC8'

// 初始化header
async function fetchHeader() {
  const res = await fetch('http://fonger.feiyux.top/api/fonger//headers', {
    headers: {
      secret,
    },
  })
  if (res.ok) {
    const data = await res.json()
    if (data.status === 200) {
      let mg = data.data.find((item) => item.from === 'MG')
      if (mg === undefined) {
        mg = data.data[0]
      }
      if (mg) {
        headers.By = mg.by
        headers.Referer = mg.referer
        headers.channel = mg.channel
        headers.Cookie = mg.cookie
        headers['User-Agent'] = mg.user_agent
      }
    }
    if (import.meta.env.DEV) {
      console.log('fetchHeader', data)
    }
  }
  if (import.meta.env.DEV) {
    console.log('fetchHeader', res.ok, headers)
  }
  log.info('fetchHeader', res.ok)
}

fetchHeader()

const filter: Electron.WebRequestFilter = {
  urls: ['https://m.music.migu.cn/*', 'https://app.c.nf.migu.cn/*'],
}

// const SINCE = new Date(Date.now() + 24 * 3600).toUTCString()

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      details.requestHeaders['Referer'] = headers.Referer
      details.requestHeaders['User-Agent'] = headers['User-Agent']
      details.requestHeaders['By'] = headers.By
      details.requestHeaders['channel'] = headers.channel
      details.requestHeaders['Cookie'] = headers.Cookie
      details.requestHeaders['Cache-Control'] = 'max-age=86400'
      callback({ requestHeaders: details.requestHeaders })
    }
  )
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   if (details.responseHeaders) {
  //     details.responseHeaders['Cache-Control'] = ['max-age=86400']
  //     details.responseHeaders['Age'] = ['100']
  //     details.responseHeaders['If-Modified-Since'] = [SINCE]
  //   }
  //   callback({ responseHeaders: details.responseHeaders })
  // })
})

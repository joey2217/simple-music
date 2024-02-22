import { app, session } from 'electron'

let headers = {
  Referer: 'https://m.music.migu.cn/v4/',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36 HBPC/12.1.2.300',
  By: '04f81461a98c7af557fea3cf28c4ea15',
  channel: '014000D',
  Cookie: 'SESSION=ZTIwODkyMDQtOTE1NS00MDhlLThhMWEtMjQ0N2Y2Mzk2OTAz',
}

// 初始化header
function fetchHeader() {
  return fetch('http://api.fonger.top/pc/headers.json')
    .then((res) => res.json())
    .then((data) => {
      if (data.mg) {
        headers = data.mg
      }
    })
}

fetchHeader()

const filter: Electron.WebRequestFilter = {
  urls: ['https://m.music.migu.cn/*', 'https://app.c.nf.migu.cn/*'],
}

const SINCE = new Date(Date.now() + 24 * 3600).toUTCString()

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

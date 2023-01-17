import { app, session } from 'electron'

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://music.163.com/*'],
}

app.whenReady().then(() => {
  console.log('proxy@@@@@@@@')

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      console.log(details)
      details.requestHeaders['User-Agent'] = 'MyAgent'
      callback({ requestHeaders: details.requestHeaders })
    }
  )
})

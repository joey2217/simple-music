import { app, session } from 'electron'

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['*://localhost/*'],
}

app.whenReady().then(() => {
    console.log('proxy@@@@@@@@');
    
  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      console.log(details)
      details.requestHeaders['User-Agent'] = 'MyAgent'
      callback({ requestHeaders: details.requestHeaders })
    }
  )
})

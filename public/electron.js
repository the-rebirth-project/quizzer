const {
  app,
  BrowserWindow,
  session
} = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Quizzer v0.4',
    width: 1366,
    height: 768,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: !isDev,
      devTools: true
    }
  });
  isDev ? mainWindow.loadURL('http://localhost:3000') : mainWindow.loadFile(`${__dirname}/index.html`)
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });

    installExtension(REDUX_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.on('page-title-updated', e => {
    e.preventDefault();
  });
  // describe CSP
  // the directive allows for unsafe-inline styles which should be fixed. it's a temporary workaround to get styled-components working. FIX BEFORE DEPLOYING TO PROD.
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "script-src 'self' https://opentdb.com/api.php https://kit.fontawesome.com/4c134e46f3.js; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
        ]
      }
    });
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
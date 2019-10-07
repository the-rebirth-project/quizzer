const electron = require('electron');
const { app, BrowserWindow, session } = electron;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow = null;
app.on('ready', createWindow);
app.on('ready', describeCSP);
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
function createWindow() {
	mainWindow = new BrowserWindow({
		title: 'Trivia Quiz v0.3',
		width: 1024,
		height: 1024,
		fullscreen: true
	});
	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
	mainWindow.on('page-title-updated', e => {
		e.preventDefault();
	});
}

function describeCSP() {
	console.log('SCP DESCRIBED!');
	session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Content-Security-Policy': [
					"script-src style-src 'self' https://opentdb.com/api.php"
				]
			}
		});
	});
}

'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;
const setupEvents = require('./config/squirrel');
if (setupEvents.handleSquirrelEvent(app)) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	return;
}

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {

	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
	var window = new electron.BrowserWindow({
		title: "OWASP Threat Dragon",
		icon: path.join(__dirname, './content/icons/png/64x64.png'),
		width: width,
		height: height
	});

	window.loadURL(`file://${__dirname}/index.html`);
	window.on('closed', onClosed);
	window.webContents.on('new-window', function (e, url) {
		e.preventDefault();
		require('electron').shell.openExternal(url);
	});

	return window;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
'use strict';
const electron = require('electron');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {

	const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
	var window = new electron.BrowserWindow({
		title: "OWASP Threat Dragon",
		icon: "./content/images/threatdragon.ico",
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
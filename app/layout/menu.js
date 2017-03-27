'use strict';

const { Menu } = require('electron');
const electron = require('electron');
const app = electron.app;

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N'
      },
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O'
      },
      {
        label: 'Open Demo Model',
        accelerator: 'CmdOrCtrl+D'
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+C'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+X'
      },
      {
        type: 'separator'
      },
      {
        label: 'Exit',
        role: 'close'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Documentation',
        click() { require('electron').shell.openExternal('http://docs.threatdragon.org') }
      },
      {
        label: 'Submit an Issue',
        click() { require('electron').shell.openExternal('https://github.com/mike-goodwin/owasp-threat-dragon-desktop/issues/new') }
      },
      {
        label: 'Visit us on GitHub',
        click() { require('electron').shell.openExternal('https://github.com/mike-goodwin/owasp-threat-dragon-desktop') }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
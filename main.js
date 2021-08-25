const electron = require('electron');
const path = require('path');
const url = require('url');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// listen for app to be ready
app.on('ready', function () {
  // Create new window
  mainWindow = new BrowserWindow({});
  // Load HTML file into the window
  console.log(__dirname)
  mainWindow.loadURL('http://localhost:8080');
})

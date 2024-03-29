const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config();

/** * @type {BrowserWindow} */
let windowMain;
const createWindow = () => {
    windowMain = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    windowMain.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('run-script', async (event, value) => {
    const libSql = require("@libsql/client");
    try {
        windowMain.setProgressBar(0.5, {mode: 'paused'});
        if(!process.env.URL_DATABASE || !process.env.URL_TOKEN_DATABASE) throw 'precisa configurar as variáveis URL_DATABASE e URL_TOKEN_DATABASE';

        const client = libSql.createClient({
            url: process.env.URL_DATABASE,
            authToken: process.env.URL_TOKEN_DATABASE,
        });
    
        const result = await client.execute(value);
        windowMain.webContents.send('getResult', result);
    } catch (error) {
        console.error(error);
        windowMain.webContents.send('getResult', {error});
    } finally {
        windowMain.setProgressBar(0);
    };
});
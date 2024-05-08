const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const fs = require('fs/promises');
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

    if (process.env.SHOW_APPLICATION_MENU !== 'true') Menu.setApplicationMenu(null);

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

ipcMain.on('run-script', async (_, value) => {
    const libSql = require("@libsql/client");
    try {
        windowMain.setProgressBar(0.5, {mode: 'paused'});
        if(!process.env.URL_DATABASE || !process.env.URL_TOKEN_DATABASE) throw 'precisa configurar as variáveis URL_DATABASE e URL_TOKEN_DATABASE';

        const client = libSql.createClient({
            url: process.env.URL_DATABASE,
            authToken: process.env.URL_TOKEN_DATABASE,
        });
    
        if(value.executeMultiple) {
            await client.executeMultiple(value.sql);
            showMessageBox({message: 'script executado com sucesso'});
            return
        };

        const result = await client.execute(value.sql);
        if(value.type === 'export') {
            await saveFile(result, value.table);
        } else {
            windowMain.webContents.send('getResult', {result, type: value.type});
        };
    } catch (error) {
        windowMain.webContents.send('getResult', {result: {error}, type: value.type});
    } finally {
        windowMain.setProgressBar(0);
    };
});

ipcMain.on('show-message-box', async (_, value) => {
    showMessageBox(value);
});

/**
 * 
 * @param {{message: string | Error, type: string}} value 
 */
function showMessageBox(value) {
    const message = typeof value.message === 'string' ? value.message : value.message?.message;
    const detail = value.message?.stack ?? '';
    dialog.showMessageBox({
        title: 'Alerta',
        message,
        detail,
        type: value?.type ?? 'info',
    });
    console.log(value);
}

/**
 * 
 * @param {import('@libsql/client').ResultSet} value 
 */
async function saveFile(value, tableName = 'tableName') {
    try {
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory', 'createDirectory'],
        });

        if(!result.canceled) {
            windowMain.setProgressBar(0.5, {mode: 'paused'});

            const { columns, rows } = value;
            let sqlString = '';
            rows?.map((item) => {
                let valuesString = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (`;
                columns?.map((name) => {
                    if(typeof item[name] === 'string') {
                        valuesString += `'${item[name]}', `;
                    } else {
                        valuesString += `${item[name]}, `;
                    }
                });
                valuesString = valuesString.replace(/, $/gi, '');
                valuesString += ');\n';
                sqlString += valuesString;
            });
            await fs.writeFile(`${result.filePaths[0]}\\${tableName}.sql`, sqlString, { encoding: 'ascii' });

            showMessageBox({message: 'Arquivo exportado com sucesso'});
        }
    } catch (error) {
        showMessageBox({message: error, type: 'error'});
    } finally {
        windowMain.setProgressBar(0);
    };
}
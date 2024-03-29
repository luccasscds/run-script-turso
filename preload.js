const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('App', {
    runScript: (value) => ipcRenderer.send("run-script", value),
    getResult: (callback) => ipcRenderer.on("getResult", callback),
});
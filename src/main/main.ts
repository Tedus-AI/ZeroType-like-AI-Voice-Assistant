import { app, BrowserWindow } from 'electron';
import path from 'node:path';

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';

  if (!app.isPackaged) {
    mainWindow.loadURL(devServerUrl).catch(console.error);
    return;
  }

  mainWindow.loadFile(path.join(__dirname, '../../dist/index.html')).catch(console.error);
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

import { app, ipcMain, ipcRenderer } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    frame: false,
    closable: true,
    hasShadow: true,
    minWidth: 800,
    minHeight: 600,
    transparent: true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true  
    }
  });

  mainWindow.removeMenu()
  SetVibrancy(window, material)

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on('minimize', () => mainWindow.minimize())

  ipcMain.on('maximize', (e) => {
    if(mainWindow.isMaximized()){
      mainWindow.unmaximize()
    }else{
      mainWindow.maximize()
    }
  })
  
  ipcMain.on('close', () => app.emit('window-all-closed'))

})();

app.on('window-all-closed', () => {
  console.log('quit')
  app.quit();
});

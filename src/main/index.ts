import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  screen,
  Menu,
  IpcMainEvent,
  MenuItemConstructorOptions,
  PopupOptions,
  Tray,
  nativeImage
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
let mainWindow: BrowserWindow
function createWindow(): void {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const w = 300,
    h = 300
  mainWindow = new BrowserWindow({
    width: w,
    height: h,
    x: width - w,
    y: height - h,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    // resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.setAspectRatio(1)
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray: Tray | null = null
app.on('ready', () => {
  const temp = [{ label: '11' }, { label: '22' }, { label: '33' }]
  const menu = Menu.buildFromTemplate(temp)
  const icon = nativeImage.createFromPath(join(__dirname, 'bitbug_favicon.ico'))
  tray = new Tray(icon)
  tray.setTitle('8888888888')
  tray.setToolTip('1111111111')
  tray.setContextMenu(menu)
  console.log(tray)
})
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const temp = [
  {
    role: 'quit'
  }
] as MenuItemConstructorOptions[]
const menu = Menu.buildFromTemplate(temp)

ipcMain.on('quit', (event: IpcMainEvent) => {
  const eventWin = BrowserWindow.fromWebContents(event.sender)
  const opt = { window: eventWin } as PopupOptions
  menu.popup(opt)
})

ipcMain.on('mouseMove', (_event: IpcMainEvent, { x, y }) => {
  console.log(x, y)
  const [x1, y1] = mainWindow.getPosition()
  mainWindow.setBounds({ x: x + x1, y: y + y1 })
  // mainWindow.setPosition(x + x1, y + y1)
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

import { ElectronAPI } from '@electron-toolkit/preload'
import { mouseMoveType } from './index'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      quit: () => void
      mouseMove: (opt: mouseMoveType) => void
    }
  }
}

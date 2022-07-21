import { BrowserWindow } from 'electron'
const defaultProps = {
    width: 500,
    height: 800,
    show: false,
    webPreferences: {
        nodeIntegration: true,
    }
}

class Window extends BrowserWindow {
    constructor(file:string, windowSettings?:Electron.BrowserWindowConstructorOptions) {
        super({...defaultProps,...windowSettings})
        this.loadFile(file)
        this.once('ready-to-show',this.show)
    }
}

export default Window
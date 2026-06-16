import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { StartScene } from './scenes/start.js'
import { LevelOne } from './scenes/levelOne.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        this.addScene("start", new StartScene())
        this.addScene("game", new LevelOne())
        this.goToScene("start")
    }

}

new Game()

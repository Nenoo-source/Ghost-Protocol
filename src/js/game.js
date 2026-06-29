import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, CollisionType, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { StartScene } from './scenes/start.js'
import { LevelOne } from './scenes/levelOne.js'
import { LevelTwo } from './scenes/levelTwo.js'
import { GameOver } from './scenes/gameOver.js'
import { BossArena } from './scenes/bossarena.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 800),
            }
        })

        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        this.addScene("start", new StartScene())
        this.addScene("game", new LevelOne())
        this.addScene("LevelTwo", new LevelTwo())
        this.addScene("GameOver", new GameOver())
        this.addScene("BossArena", new BossArena())




        this.goToScene("start")
    }
}

new Game()

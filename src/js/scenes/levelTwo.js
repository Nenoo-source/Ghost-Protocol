import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Player1 } from "../actors/player1/player1.js"
import { Tv } from "../actors/enemyone.js"
import { Ground } from "../actors/ground.js"
import { Cookie } from "../actors/enemyabilities/enemyabilityone.js"
import { Player2 } from "../actors/player2/player2.js"
import { Platform } from "../actors/platform.js"
import { Coin } from "../actors/coin.js"
import { GameOver } from "./gameOver.js"
import { Player } from "../actors/playerBase.js"
import { UI } from "../ui.js"
import { Cable } from "../actors/enemytwo.js"


export class LevelTwo extends Scene {
    onInitialize(engine, x, y, scX, scY) {
        const background = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            z: -1,
        })
        background.graphics.use(Resources.Background.toSprite())
        this.add(background)
        background.scale = new Vector(0.85, 0.8)
        Resources.Ezdiffmusic1.loop = true;
        Resources.Ezdiffmusic1.play()

        //playerBase
        this.pb = new Player()
        this.add(this.pb)

        //player 1
        this.p1 = new Player1("player1", 100, 540)
        this.add(this.p1)

        //player 2
        this.p2 = new Player2("player2", 200, 540)
        this.p2.other = this.p1
        this.add(this.p2)

        // TV enemy
        this.ca = new Cable()
        this.add(this.ca)
        // ground
        const g = new Ground()
        this.add(g)

        this.c = new Coin(50, 70)
        this.add(this.c)

        this.ui = new UI()
        this.add(this.ui)



        this.addPlatforms()
    }


    addPlatforms() {
        // platforms
        let positions = [
            { "x": 600, "y": 400, "scX": 0.5, "scY": 0.5 },
            { "x": 400, "y": 275, "scX": 0.5, "scY": 0.5 },
            { "x": 800, "y": 275, "scX": 0.5, "scY": 0.5 },
            { "x": 1200, "y": 140, "scX": 2, "scY": 0.5 },
            { "x": 100, "y": 140, "scX": 1, "scY": 0.5 },


        ]
        for (let pos of positions) {
            this.add(new Platform(pos.x, pos.y, pos.scX, pos.scY))
        }
    }

    onPreUpdate(engine) {
        if (this.pb.safety <= 0) {
            this.pb.safety = 50
            this.ui.safetybar.scale = new Vector(this.pb.safety / 50, 1)
            engine.goToScene("GameOver", {
                sourceOut: new FadeInOut({ duration: 600, direction: 'out' }),
                destinationIn: new FadeInOut({ duration: 600, direction: 'in' })
            })
        }
    }
}



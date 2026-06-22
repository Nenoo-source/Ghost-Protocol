import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Player } from "../actors/playerBase.js"
import { Player1 } from "../actors/player1/player1.js"
import { Tv } from "../actors/enemyone.js"
import { Ground } from "../actors/ground.js"
import { Cookie } from "../actors/enemyabilities/enemyabilityone.js"
import { Player2 } from "../actors/player2/player2.js"
import { Platform } from "../actors/platform.js"
import { Coin } from "../actors/coin.js"
import { UI } from "../UI.js"


export class LevelOne extends Scene {
    onInitialize(engine, x, y) {
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
        this.wentToLevelTwo = false

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
        const t = new Tv()
        this.add(t)

        // ground
        const g = new Ground()
        this.add(g)

        // coin
        this.c = new Coin(100, 70)
        this.add(this.c)

        // ui
        this.ui = new UI()
        this.add(this.ui)



        this.addPlatforms()
    }



    addPlatforms() {
        // platforms
        let positions = [
            { "x": 700, "y": 250 },
            { "x": 900, "y": 400 },
            { "x": 400, "y": 200 },
            { "x": 100, "y": 140 },


        ]
        for (let pos of positions) {
            this.add(new Platform(pos.x, pos.y))
        }
    }


    onPreUpdate(engine) {
        if (this.c.coinCollected === true && !this.wentToLevelTwo) {
            this.wentToLevelTwo = true

            engine.goToScene("LevelTwo", {
                sourceOut: new FadeInOut({ duration: 600, direction: 'out' }),
                destinationIn: new FadeInOut({ duration: 600, direction: 'in' })
            })
        }
    }
}



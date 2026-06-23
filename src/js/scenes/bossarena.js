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
import { UI } from "../ui.js"
import { Ghost } from "../actors/ghost.js"

export class BossArena extends Scene {
    onInitialize(engine, x, y, scX, scY) {
        const background = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            z: -1,
        })
        background.graphics.use(Resources.BossBackground.toSprite())
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

        // ground
        const g = new Ground()
        this.add(g)


        // ui
        this.ui = new UI()
        this.add(this.ui)

        //ghost boss
        this.gh = new Ghost()
        this.add(this.gh)


        this.addPlatforms()
    }



    addPlatforms() {
        // platforms
        let positions = [
            // { "x": 700, "y": 250, "scX": 0.8, "scY": 0.5 },



        ]
        for (let pos of positions) {
            this.add(new Platform(pos.x, pos.y, pos.scX, pos.scY))
        }
    }


    onPreUpdate(engine) {
        if (this.pb.safety <= 0) {
            this.pb.safety = 50
            engine.goToScene("GameOver", {
                sourceOut: new FadeInOut({ duration: 600, direction: 'out' }),
                destinationIn: new FadeInOut({ duration: 600, direction: 'in' })
            })
        }
    }

    onDeactivate(engine) {
        Resources.Ezdiffmusic1.stop()
    }
}



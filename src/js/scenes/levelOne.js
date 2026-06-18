import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Player1 } from "../actors/player1/player1.js"
import { Player2 } from "../actors/player2/player2.js"
import { Tv } from "../actors/enemyone.js"
import { Ground } from "../actors/ground.js"


export class LevelOne extends Scene {
    onInitialize(engine) {
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


        const p1 = new Player1("player1")
        this.add(p1)

        const p2 = new Player2("player2")
        this.add(p2)

        const t = new Tv()
        this.add(t)

        const g = new Ground()
        this.add(g)
    }
}



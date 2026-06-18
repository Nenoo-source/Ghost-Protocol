import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { Player1 } from "../actors/player1/player1.js"
import { Tv } from "../actors/enemyone.js"
import { Ground } from "../actors/ground.js"
import { Player2 } from "../actors/player2/player2.js"
import { Platform } from "../actors/platform.js"


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


        const p1 = new Player1("player1")
        this.add(p1)

        const p2 = new Player2("player2")
        this.add(p2)

        const t = new Tv()
        this.add(t)

        const g = new Ground()
        this.add(g)

        this.addPlatforms()
    }

    addPlatforms() {
        // platforms
        let positions = [
            { "x": 400, "y": 570 },
            { "x": 500, "y": 400 },
            { "x": 900, "y": 350 },
            { "x": 1100, "y": 250 },
            { "x": 1200, "y": 350 },
            { "x": 1300, "y": 350 },
            { "x": 1400, "y": 350 },
        ]
        for (let pos of positions) {
            const platform = new Platform(pos.x, pos.y)
            this.add(platform)
        }
    }
}



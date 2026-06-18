import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { player1 } from "../actors/player1/player1.js"
import { tv } from "../actors/enemyone.js"
import { ground } from "../actors/ground.js"
import { player2 } from "../actors/player2/player2.js"
import { Platform } from "../actors/Platform.js"


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


        const p1 = new player1()
        this.add(p1)

        const p2 = new player2()
        this.add(p2)

        const t = new tv()
        this.add(t)

        const g = new ground()
        this.add(g)

        const pl = new Platform
    }
        addPlatforms(x,y){
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
                this.add(new Platform(x, y))
            }
        }
    }



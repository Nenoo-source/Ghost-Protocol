import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"
import { Ground } from '../ground.js'
import { Player } from '../playerBase.js'

export class Player1 extends Player {

    constructor(player) {
        super({
            width: Resources.player1.width,
            height: Resources.player1.height
        })
        this.player = player
    }

    onInitialize(engine) {
        super.onInitialize(engine)

        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.player1.toSprite())
        this.pos = new Vector(100, 540)
    }
}
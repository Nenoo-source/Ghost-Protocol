import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from '../resources.js'
import { Player1 } from "./player1/player1.js"
import { Player2 } from "./player2/player2.js"

export class Tv extends Actor {
    constructor() {
        super({
            width: Resources.tv.width,
            height: Resources.tv.height
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.tv.toSprite())
        this.scale = new Vector(0.25, 0.25)
        this.pos = new Vector(700, 540)
        //zwaartekracht
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.actions.repeat((repeatCtx) => {
            repeatCtx.moveBy(300, 0, 100)
            repeatCtx.moveBy(-300, 0, 100)
        },)
    }
    onCollisionStart(event, other) {
        if (other.owner instanceof Player1 || other.owner instanceof Player2) {
            other.owner.kill()
        }
    }
}
import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from '../resources.js'

export class tv extends Actor {
    constructor() {
        super({
            width: Resources.tv.width,
            height: Resources.tv.height
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.tv.toSprite())
        this.scale = new Vector(0.3, 0.3)
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

}
import { CollisionType, Actor, Vector, Rectangle, Color } from 'excalibur'
import { Resources } from '../resources.js'

export class SafetyOutline extends Actor {

    constructor(x, y) {
        super()
        this.x = x
        this.y = y
    }

    onInitialize(engine) {
        this.scale = new Vector(0.35, 0.35)
        this.graphics.use(Resources.SafetyOutline.toSprite())
        this.pos = new Vector(this.x, this.y)
    }
}
import { CollisionType, Actor, Vector, Rectangle, Color } from 'excalibur'
import { Resources } from '../resources.js'

export class Platform extends Actor {

    constructor(x, y) {
        super({
            width: Resources.platform.width,
            height: Resources.platform.height
        })
        this.pos = new Vector(x, y)
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed
        this.scale = new Vector(0.5, 0.5)
        this.graphics.use(Resources.platform.toSprite())
    }
}
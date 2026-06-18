import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from '../../resources.js'

export class Cookie extends Actor {
    constructor(x, y, direction = -1) {
        super({
            width: Resources.cookie.width,
            height: Resources.cookie.height
        })

        this.pos = new Vector(x, y)
        this.body.useGravity = false
        this.body.collisionType = CollisionType.Active

        // snelheid
        this.vel = new Vector(300 * direction, 0)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.cookie.toSprite())
        this.scale = new Vector(0.3, 0.3)
    }
}

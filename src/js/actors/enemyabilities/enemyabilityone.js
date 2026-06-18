import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from '../../resources.js'
import { Player1 } from '../../actors/player1/player1.js'
import { Player2 } from '../../actors/player2/player2.js'

export class Cookie extends Actor {
    lifetime = 0

    constructor(x, y, direction = -1) {
        super({
            width: Resources.cookie.width,
            height: Resources.cookie.height
        })

        this.pos = new Vector(x, y)
        this.body.useGravity = false
        this.body.collisionType = CollisionType.Passive

        this.vel = new Vector(300 * direction, 0)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.cookie.toSprite())
        this.scale = new Vector(0.1, 0.1)
    }
    onCollisionStart(event, other) {
        if (other.owner instanceof Player1 || other.owner instanceof Player2) {
            other.owner.kill()
            this.kill()
        }
    }

    onPostUpdate(engine, delta) {
        super.onPostUpdate(engine, delta)
        this.lifetime += delta
        this.rotation -= 0.05
        if (Math.random() < 0.1) {
            this.graphics.opacity = 0.4 + Math.random() * 0.6
        } else {
            this.graphics.opacity = 1
        }


        if (this.lifetime >= 4000) {
            this.kill()
        }
    }
}


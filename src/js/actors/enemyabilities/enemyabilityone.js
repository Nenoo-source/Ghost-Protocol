import { Actor, Vector, CollisionType, Color } from "excalibur"
import { Resources } from '../../resources.js'
import { Player1 } from '../../actors/player1/player1.js'
import { Player2 } from '../../actors/player2/player2.js'
import { isCorrectBlock } from "../../actors/player2/2-ability3.js"

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

        // Player2 blocks Cookie with block type 1
        if (other.owner instanceof Player2) {

            if (isCorrectBlock(other.owner, 1)) {

                // push cookie away
                this.vel.x *= -2
                this.vel.y = -200

                return
            }

            other.owner.kill()
            this.kill()
            return
        }

        // Player1 cannot block cookies
        if (other.owner instanceof Player1) {
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

        const trail = new Actor({
            x: this.pos.x,
            y: this.pos.y,
            width: 8,
            height: 8,
            color: Color.fromRGB(0, 200, 255) // neon blauw
        })

        trail.graphics.opacity = 0.8
        trail.z = -0.5 // achter de cookie

        // Deeltje toevoegen
        engine.currentScene.add(trail)

        // Deeltje langzaam laten verdwijnen
        trail.actions.fade(0, 200).die()

        if (this.lifetime >= 4000) {
            this.kill()
        }
    }
}


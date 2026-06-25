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
        this.scale = new Vector(0.08, 0.08)

        // Zoek de spelers
        const p1 = engine.currentScene.p1
        const p2 = engine.currentScene.p2

        // Bereken afstand tot beide spelers
        const distToP1 = this.pos.distance(p1.pos)
        const distToP2 = this.pos.distance(p2.pos)

        // Kies de dichtstbijzijnde speler
        const target = distToP1 < distToP2 ? p1 : p2

        // Richtingvector naar de speler
        const direction = target.pos.sub(this.pos).normalize()

        // Snelheid instellen richting speler
        const speed = 300
        this.vel = direction.scale(speed)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Player2) {
            if (isCorrectBlock(other.owner, 1)) {
                this.vel.x *= -2
                this.vel.y = -200
                Resources.Shielddeflect.play()
                return
            }

            this.kill()
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p2.pos = new Vector(200, 420)
            return
        }

        if (other.owner instanceof Player1) {
            this.kill()
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p1.pos = new Vector(100, 420)
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
            color: Color.fromRGB(0, 200, 255)
        })

        trail.graphics.opacity = 0.8
        trail.z = -0.5

        engine.currentScene.add(trail)
        trail.actions.fade(0, 200).die()

        if (this.lifetime >= 4000) {
            this.kill()
        }
    }
}




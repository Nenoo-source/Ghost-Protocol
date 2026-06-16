import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"
import { ground } from './ground.js'

export class player1 extends Actor {

    constructor() {
        super({
            width: Resources.player1.width,
            height: Resources.player1.height
        })

    }
    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.player1.toSprite())
        this.pos = new Vector(100, 540)

        //player zwaartekracht
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }


    onPreUpdate(engine) {

        let xspeed = 0
        let yspeed = 0
        this.speed = 300

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            if (this.grounded) {
                this.body.applyLinearImpulse(new Vector(0, -750 * delta))
            }
        }

        if (engine.input.keyboard.isHeld(Keys.D)) {
            xspeed += this.speed
        }
        if (engine.input.keyboard.isHeld(Keys.A)) {
            xspeed -= this.speed
        }

        console.log(xspeed, yspeed)
        this.vel = new Vector(xspeed, yspeed)



        if (xspeed !== 0) {
            this.graphics.flipHorizontal = xspeed < 0
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof ground) {
            this.grounded = true
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof ground) {
            this.grounded = false
        }
    }
}
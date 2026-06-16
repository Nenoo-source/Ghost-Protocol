import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"
import { ground } from '../ground.js'


export class player2 extends Actor {

    constructor() {
        super({
            width: Resources.player2.width,
            height: Resources.player2.height
        })

    }
    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.player2.toSprite())
        this.pos = new Vector(100, 540)

        //player zwaartekracht
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }


    onPreUpdate(engine, delta) {

        if (engine.input.keyboard.wasPressed(Keys.I)) {
            if (this.grounded) {
                this.body.applyLinearImpulse(new Vector(0, -350 * delta))
            }
        }

        let xspeed = 0

        if (engine.input.keyboard.isHeld(Keys.J)) {
            // FORCE
            this.body.applyLinearImpulse(new Vector(-15 * delta, 0))
            // KINEMATIC: links en rechts lopen met velocity
            this.vel = new Vector(-300, this.vel.y)
            xspeed = -300
            this.graphics.flipHorizontal = true
        }
        if (engine.input.keyboard.isHeld(Keys.L)) {
            // FORCE
            this.body.applyLinearImpulse(new Vector(15 * delta, 0))
            // KINEMATIC: links en rechts lopen met velocity
            this.vel = new Vector(300, this.vel.y)
            xspeed = 300
            this.graphics.flipHorizontal = false
        }
        this.vel = new Vector(xspeed, this.vel.y)



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
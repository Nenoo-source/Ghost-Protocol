import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom, Side } from "excalibur"
import { Ground } from './ground.js'
import { Platform } from "./platform.js"

export class Player extends Actor {

    constructor(options) {
        super(options)
    }

    onInitialize(engine) {
        //player zwaartekracht
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)

        this.safety = 50
        this.movementSpeed = 300
    }

    onPreUpdate(engine, delta) {
        if (this.vel.y === 0) {
            this.grounded = true
        } else {
            this.grounded = false
        }

        if (engine.input.keyboard.wasPressed(Keys.W) && this.player === "player1") {
            if (this.grounded) {
                this.body.applyLinearImpulse(new Vector(0, -250 * delta))
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.I) && this.player === "player2") {
            if (this.grounded && !this.superJumpArmed) {  
                this.body.applyLinearImpulse(new Vector(0, -250 * delta))
            }

        }

        this.xspeed = 0

        if (engine.input.keyboard.isHeld(Keys.A) && this.player === "player1") {
            this.xspeed -= this.movementSpeed
            this.graphics.flipHorizontal = true
        }
        if (engine.input.keyboard.isHeld(Keys.J) && this.player === "player2") {
            this.xspeed -= this.movementSpeed
            this.graphics.flipHorizontal = true
        }

        if (engine.input.keyboard.isHeld(Keys.D) && this.player === "player1") {
            this.xspeed += this.movementSpeed
            this.graphics.flipHorizontal = false
        }
        if (engine.input.keyboard.isHeld(Keys.L) && this.player === "player2") {
            this.xspeed += this.movementSpeed
            this.graphics.flipHorizontal = false
        }

        this.vel = new Vector(this.xspeed, this.vel.y)

    }

    onPostUpdate() {
        if (this.safety >= 100) {
            this.safety = 100
        }
        this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
    }

    onCollisionEnd(self, other) {
        if (other.owner instanceof Ground || other.owner instanceof Platform) {
            this.grounded = false
        }
    }
}
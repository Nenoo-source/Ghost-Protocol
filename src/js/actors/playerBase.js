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

        this.grounded = false

        this.safety = 50
        this.movementSpeed = 300
    }

    onPreUpdate(engine, delta) {
<<<<<<< Updated upstream
        if (this.vel.y === 0) {
            this.grounded = true
        } else {
            this.grounded = false
        }

=======
>>>>>>> Stashed changes
        if (engine.input.keyboard.wasPressed(Keys.W) && this.player === "player1") {
            if (this.grounded) {
                this.grounded = false
                this.vel = new Vector(this.vel.x, -800)
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.I) && this.player === "player2") {
<<<<<<< Updated upstream
            if (this.grounded && !this.superJumpArmed) {  
                this.body.applyLinearImpulse(new Vector(0, -250 * delta))
=======
            if (this.grounded && !this.superJumpArmed) {
                this.grounded = false
                this.vel = new Vector(this.vel.x, -800)
>>>>>>> Stashed changes
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

        if (!this.grounded && this.jumpGraphic && this.currentGraphic !== "jump") {
            this.graphics.use(this.jumpGraphic)
            this.currentGraphic = "jump"
        } else if (this.xspeed !== 0) {
            if (this.runGraphic && this.currentGraphic !== "run") {
                this.graphics.use(this.runGraphic)
                this.currentGraphic = "run"
            }
        } else {
            if (this.idleGraphic && this.currentGraphic !== "idle") {
                this.graphics.use(this.idleGraphic)
                this.currentGraphic = "idle"
            }
        }
    }

    onPostUpdate() {
        if (this.safety >= 100) {
            this.safety = 100
        }
        this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
    }

<<<<<<< Updated upstream
=======
    onCollisionStart(self, other, side, contact) {
        if ((other.owner instanceof Ground || other.owner instanceof Platform) && side === Side.Bottom) {
            this.grounded = true
        }
    }

>>>>>>> Stashed changes
    onCollisionEnd(self, other) {
        if (other.owner instanceof Ground || other.owner instanceof Platform) {
            this.grounded = false
        }
    }
}
import { Actor, CollisionType, DegreeOfFreedom, Keys, Side, Vector } from "excalibur"
import { Ground } from './ground.js'
import { Platform } from "./platform.js"

export class Player extends Actor {

    constructor(options) {
        super(options)
    }

    onInitialize(engine) {
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)

        this.grounded = false
        this.safety = 50
        this.movementSpeed = 300
        this.xspeed = 0
    }

    onPreUpdate(engine, delta) {
        const keyboard = engine.input.keyboard

        // Jump player 1
        if (keyboard.wasPressed(Keys.W) && this.player === "player1") {
            if (this.grounded) {
                this.grounded = false
                this.vel = new Vector(this.vel.x, -400)
            }
        }

        // Jump player 2
        if (keyboard.wasPressed(Keys.I) && this.player === "player2") {
            if (this.grounded && !this.superJumpArmed) {
                this.grounded = false
                this.vel = new Vector(this.vel.x, -400)
            }
        }

        this.xspeed = 0

        // Move left player 1
        if (keyboard.isHeld(Keys.A) && this.player === "player1") {
            this.xspeed -= this.movementSpeed
            this.graphics.flipHorizontal = true
        }

        // Move left player 2
        if (keyboard.isHeld(Keys.J) && this.player === "player2") {
            this.xspeed -= this.movementSpeed
            this.graphics.flipHorizontal = true
        }

        // Move right player 1
        if (keyboard.isHeld(Keys.D) && this.player === "player1") {
            this.xspeed += this.movementSpeed
            this.graphics.flipHorizontal = false
        }

        // Move right player 2
        if (keyboard.isHeld(Keys.L) && this.player === "player2") {
            this.xspeed += this.movementSpeed
            this.graphics.flipHorizontal = false
        }

        this.vel = new Vector(this.xspeed, this.vel.y)

        // Graphics
        if (!this.grounded && this.jumpGraphic && this.currentGraphic !== "jump") {
            this.graphics.use(this.jumpGraphic)
            this.currentGraphic = "jump"
        } else if (this.grounded && this.xspeed !== 0) {
            if (this.runGraphic && this.currentGraphic !== "run") {
                this.graphics.use(this.runGraphic)
                this.currentGraphic = "run"
            }
        } else if (this.grounded) {
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

        if (this.scene?.ui?.safetybar) {
            this.scene.ui.safetybar.scale = new Vector(this.safety / 50, 1)
        }
    }

    onCollisionStart(self, other, side, contact) {
        if ((other.owner instanceof Ground || other.owner instanceof Platform) && side === Side.Bottom) {
            this.grounded = true
        }
    }

    onCollisionEnd(self, other) {
        if (other.owner instanceof Ground || other.owner instanceof Platform) {
            this.grounded = false
        }
    }
}
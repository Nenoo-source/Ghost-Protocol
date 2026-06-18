import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
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
    }

    onPreUpdate(engine, delta) {

        if (engine.input.keyboard.wasPressed(Keys.W) && this.player === "player1") {
            if (this.grounded) {
                this.body.applyLinearImpulse(new Vector(0, -350 * delta))
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.I) && this.player === "player2") {
            if (this.grounded) {
                this.body.applyLinearImpulse(new Vector(0, -350 * delta))
            }
        }

        let movementSpeed = 300
        let xspeed = 0

        if (engine.input.keyboard.isHeld(Keys.A) && this.player === "player1") {
            xspeed -= movementSpeed
            this.graphics.flipHorizontal = true
        }
        if (engine.input.keyboard.isHeld(Keys.J) && this.player === "player2") {
            xspeed -= movementSpeed
            this.graphics.flipHorizontal = true
        }

        if (engine.input.keyboard.isHeld(Keys.D) && this.player === "player1") {
            xspeed += movementSpeed
            this.graphics.flipHorizontal = false
        }
        if (engine.input.keyboard.isHeld(Keys.L) && this.player === "player2") {
            xspeed += movementSpeed
            this.graphics.flipHorizontal = false
        }

        this.vel = new Vector(xspeed, this.vel.y)
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Ground || other.owner instanceof Platform) {
            this.grounded = true
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Ground || other.owner instanceof Platform) {
            this.grounded = false
        }
    }
}
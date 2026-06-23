import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"
import { Ground } from '../ground.js'
import { Player } from '../playerBase.js'
import { ThreatScanner } from './1-ability1.js'
import { setupTransparent, updateTransparent, isTransparentReady } from "./1-ability2.js"
import { Tv } from "../enemyone.js"
import { Laser } from "../laser.js"

export class Player1 extends Player {

    constructor(player, x, y) {
        super({
            width: Resources.player1.width,
            height: Resources.player1.height
        })
        this.player = player
        this.x = x
        this.y = y
    }

    onInitialize(engine) {
        super.onInitialize(engine)

        this.scale = new Vector(0.1, 0.1)
        this.graphics.use(Resources.player1.toSprite())
        this.pos = new Vector(this.x, this.y)

        this.side = 1
        this.cooldown1Count = 0
        this.cooldown1 = false

        this.cooldown2Count = 0
        this.cooldown2 = false

        setupTransparent(this)
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta)

        if (this.player !== "player1") {
            return
        }

        updateTransparent(this, engine, delta)

    }

    onPostUpdate(engine, delta) {
        if (this.cooldown1) {
            this.cooldown1Count++
        }
        if (this.cooldown1Count >= 60) {
            this.cooldown1 = false
        }

        if (!this.cooldown1) {
            if (engine.input.keyboard.wasPressed(Keys.Digit1)) {
                this.attackAbility()
            }
        }

        if (this.cooldown2) {
            this.cooldown2Count++
        }
        if (this.cooldown2Count >= 600) {
            this.cooldown2 = false
        }

        if (!this.cooldown2) {
            if (engine.input.keyboard.wasPressed(Keys.Digit2)) {
                this.transparencyAbility()

            }
        }
    }

    attackAbility() {
        if (this.graphics.flipHorizontal) {
            this.side = -1
        } else {
            this.side = 1
        }
        let shot = new ThreatScanner(this.pos.x, this.pos.y, this.side)
        this.scene.add(shot)
        Resources.Lasergun1.play()
        this.cooldown1 = true
        this.cooldown1Count = 0
    }

    transparencyAbility() {
        if (this.cooldown2) return

        this.invisStatus = true
        this.graphics.opacity = 0.6
        Resources.Invisibility.play()

        // disable collisions only for phaseable TVs in this scene
        for (let actor of this.scene.actors) {
            if (actor instanceof Laser && actor.phaseable) {
                actor.body.collisionType = CollisionType.PreventCollision
            }
        }

        this.cooldown2 = true
        this.cooldown2Count = 0

        setTimeout(() => {
            this.invisStatus = false
            this.graphics.opacity = 1
            // restore TV collisions
            for (let actor of this.scene.actors) {
                if (actor instanceof Laser && actor.phaseable) {
                    actor.body.collisionType = CollisionType.Active
                }
            }
        }, 10000)
    }
}
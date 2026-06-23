import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"
import { Ground } from '../ground.js'
import { Player } from '../playerBase.js'
import { ThreatScanner } from './1-ability1.js'

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
}
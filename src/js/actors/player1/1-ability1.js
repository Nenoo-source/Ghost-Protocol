import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"
import { Tv } from "../enemyone"
import { Cable } from "../enemytwo"
import { Platform } from "../platform"

export class ThreatScanner extends Actor {
    constructor(x, y, side) {
        super({
            width: Resources.Projectile.width,
            height: Resources.Projectile.height
        })
        this.posX = x
        this.posY = y
        this.side = side
    }

    onInitialize(engine) {
        this.scale = new Vector(0.05, 0.07)
        this.graphics.use(Resources.Projectile.toSprite())
        this.pos = new Vector(this.posX + (40 * this.side), this.posY)
        this.vel = new Vector(700 * this.side, 0)
        if (this.side > 0) {
            this.graphics.flipHorizontal = true
        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Tv || other.owner instanceof Cable) {
            other.owner.kill()
            this.kill()
        }
        if (other.owner instanceof Platform) {
            this.kill()
        }
    }
}
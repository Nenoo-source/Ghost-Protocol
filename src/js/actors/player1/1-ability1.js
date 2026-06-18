import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"

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
        this.scale = new Vector(0.05, 0.2)
        this.graphics.use(Resources.Projectile.toSprite())
        this.pos = new Vector(this.posX + (40 * this.side), this.posY)
    }
}
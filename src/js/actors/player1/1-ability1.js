import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"

export class ThreatScanner extends Actor {
    constructor(x, y) {
        super({
            width: Resources.Projectile.width,
            height: Resources.Projectile.height
        })
        this.posX = x
        this.posY = y
    }

    onInitialize(engine) {
        this.scale(1, 1)
        this.graphics.use(Resources.Projectile.toSprite())
        this.pos = new Vector(this.posX, this.posY)
    }
}
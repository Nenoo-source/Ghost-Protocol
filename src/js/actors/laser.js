import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from '../resources.js'

export class Laser extends Actor {

    constructor(x1, y1, scX1 = 1, scY1 = 1) {
        super({
            width: Resources.Laser.width,
            height: Resources.Laser.height
        })
        this.posX = x1
        this.posY = y1
        this.scalex1 = scX1
        this.scaley2 = scY1
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed
        this.graphics.use(Resources.Laser.toSprite())
        this.pos = new Vector(this.posX, this.posY)
        this.scale = new Vector(this.scalex1, this.scaley2)
    }
}
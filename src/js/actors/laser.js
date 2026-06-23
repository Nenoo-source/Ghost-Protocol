import { CollisionType, Actor, Vector, Rectangle, Color } from 'excalibur'
import { Resources } from '../resources.js'

export class Laser extends Actor {

    constructor(x1, y1, scX1, scY1) {
        super({
            width: Resources.laser.width,
            height: Resources.laser.height,
           
        })
        this.posX = x1
        this.posY = y1
        this.scalex1 = scX1
        this.scaley2 = scY1
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed
        this.scale = new Vector(this.scalex1, this.scaley2)
        this.graphics.use(Resources.laser.toSprite())
        this.pos = new Vector(this.posX, this.posY)
    }
}
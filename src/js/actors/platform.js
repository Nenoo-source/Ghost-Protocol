import { CollisionType, Actor, Vector, Rectangle, Color } from 'excalibur'
import { Resources } from '../resources.js'

export class Platform extends Actor {

    constructor(x, y, scX, scY) {
        super({
            width: Resources.platform.width,
            height: Resources.platform.height,
           
        })
        this.posX = x
        this.posY = y
        this.scalex = scX
        this.scaley = scY
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed
        this.scale = new Vector(this.scalex, this.scaley)
        this.graphics.use(Resources.platform.toSprite())
        this.pos = new Vector(this.posX, this.posY)
    }
}
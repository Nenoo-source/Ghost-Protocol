import { CollisionType, Actor, Vector, Rectangle, Color } from 'excalibur'
import { Resources } from '../resources.js'

export class Platform extends Actor {

    constructor(x, y) {
        super({
            width: 100,
            height: 20
        })
        this.pos = new Vector(x, y)
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed
        const rect = new Rectangle({
            width: 100,
            height: 20,
            color: Color.Green
        })
        this.graphics.use(rect)
    }
}
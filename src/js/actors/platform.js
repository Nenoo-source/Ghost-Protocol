import { CollisionType, Actor, Vector , Rectangle, Color} from 'excalibur'
import { Resources } from '../resources.js'

export class Platform extends Actor {

    constructor(x, y) {
        super({
            width: 5000,
            height: 2000,
            scale: (2,2)
        })
        this.pos = new Vector(this.x, y)
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed
        
    }
}
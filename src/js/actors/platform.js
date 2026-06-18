import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from '../resources.js'

export class Platform extends Actor {

    constructor(x, y) {
        super({
            width: 5000,
            height: 20
        })
        this.pos = new Vector(x, y)
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed
    }
}
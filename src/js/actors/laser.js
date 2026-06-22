import { CollisionType, Actor, Vector, Rectangle, Color } from 'excalibur'
import { Resources } from '../resources.js'

export class Laser extends Actor {

    constructor(x, y) {
        super({
            width: 5000,
            height: 20
        })
        this.pos = new Vector(0, 600)
        
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed

    }
}
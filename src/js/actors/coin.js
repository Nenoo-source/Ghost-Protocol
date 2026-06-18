import { Engine, CollisionType, Actor, Color, Vector } from 'excalibur'
import { Resources } from '../resources'

export class Coin extends Actor {

    constructor(x, y) {
        super({ radius: Resources.Coin.width / 2 })
        this.pos = new Vector(x, y)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Coin.toSprite())
        this.body.collisionType = CollisionType.Passive
    }
}
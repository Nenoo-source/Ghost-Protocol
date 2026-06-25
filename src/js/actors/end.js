import { Engine, CollisionType, Actor, Color, Vector } from 'excalibur'
import { Resources } from '../resources'
import { Player1 } from '../actors/player1/player1'
import { Player2 } from '../actors/player2/player2'

export class Door extends Actor {

    constructor(x, y) {
        super({ 
            width: Resources.Door.width,
            height: Resources.Door.height
        })
        this.x = x
        this.y = y
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Door.toSprite())
        this.body.collisionType = CollisionType.Passive
        this.pos = new Vector(this.x, this.y)
        this.scale = new Vector(0.1, 0.1)
        this.wentInDoor = false
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Player1 || other.owner instanceof Player2) {
            if (this.scene.c.coinCollected === true) {
                this.wentInDoor = true
            }
        }
    }
}
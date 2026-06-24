import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from '../resources.js'
import { Player1 } from './player1/player1.js'
import { Player2 } from './player2/player2.js'

export class Laser extends Actor {

    constructor(x1, y1, scX1 = 1, scY1 = 1) {
        super({
            width: 5,
            height: Resources.Laser.height
        })
        this.posX = x1
        this.posY = y1
        this.scalex1 = scX1
        this.scaley2 = scY1
        
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Laser.toSprite())
        this.pos = new Vector(this.posX, this.posY)
        this.scale = new Vector(this.scalex1, this.scaley2)
    }

    onPreUpdate(engine) {
        if (this.scene.button.isButtonActive) {
            this.graphics.use(Resources.LaserOff.toSprite())
            this.scale = new Vector(this.scalex1 * 1.2, this.scaley2 * 1.2)
        } else {
            this.graphics.use(Resources.Laser.toSprite())
            this.scale = new Vector(this.scalex1, this.scaley2)
        }
    }

    onCollisionStart(event, other) {
        if (this.scene.button.isButtonActive) {
            return
        }
        if (other.owner instanceof Player1) {
            if (other.owner.invisStatus === true) {
                return
            }
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p1.pos = new Vector(100, 540)
        }
        if (other.owner instanceof Player2) {
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p2.pos = new Vector(200, 540)
        }
    }
}
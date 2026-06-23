import { CollisionType, Actor, Vector } from 'excalibur'
import { Resources } from '../resources.js'
import { ThreatScanner } from './player1/1-ability1.js'
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
export class Button extends Actor {

    constructor(x2, y2, scX2 = 1, scY2 = 1) {
        super({
            width: Resources.Button.width,
            height: Resources.Button.height,
           
        })
        this.posX = x2
        this.posY = y2
        this.scalex2 = scX2
        this.scaley3 = scY2
        
    }

    onInitialize(engine) {
<<<<<<< Updated upstream
    
=======
        this.isActive = false
>>>>>>> Stashed changes
        this.graphics.use(Resources.Button.toSprite())
        this.pos = new Vector(this.posX, this.posY)
        this.scale = new Vector(this.scalex2, this.scaley3)
        
        console.log(this.isActive)
    }
<<<<<<< Updated upstream
 onCollisionStart(event, other) {
        if (other.owner instanceof ThreatScanner) {
            this.isActive = true
        }
}
=======

    onCollisionStart(event, other) {
        if (other.owner instanceof ThreatScanner) {
            this.isActive = true
        }
    }
>>>>>>> Stashed changes
}

import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from '../resources.js'
import { Player1 } from "./player1/player1.js"
import { Player2 } from "./player2/player2.js"
import { Cookie } from "./enemyabilities/enemyabilityone.js"


export class Cable extends Actor {

    constructor() {
        super({
            width: Resources.cablemonster.width,
            height: Resources.cablemonster.height
        })
    }

    onInitialize(engine) {
        this._shootTimer = 0

        this.graphics.use(Resources.cablemonster.toSprite())
        this.scale = new Vector(0.16, 0.16)
        this.pos = new Vector(800, 560)
        //zwaartekracht
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.actions.repeat((repeatCtx) => {
            repeatCtx.moveBy(300, 0, 100)
            repeatCtx.moveBy(-300, 0, 100)
        },)

    }
    onCollisionStart(event, other) {
        if (other.owner instanceof Player1) {
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
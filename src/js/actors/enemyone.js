import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from '../resources.js'
import { Player1 } from "./player1/player1.js"
import { Player2 } from "./player2/player2.js"
import { Cookie } from "./enemyabilities/enemyabilityone.js"


export class Tv extends Actor {
    _shootTimer = 0

    constructor() {
        super({
            width: Resources.tv.width,
            height: Resources.tv.height
        })
    }

    onInitialize(engine) {
        this._shootTimer = 0

        this.graphics.use(Resources.tv.toSprite())
        this.scale = new Vector(0.16, 0.16)
        this.pos = new Vector(700, 560)
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

    onPostUpdate(engine, delta) {
        this._shootTimer += delta

        if (this._shootTimer >= 4000) {
            const cookie = new Cookie(this.pos.x - 50, this.pos.y, -1)
            engine.currentScene.add(cookie)
            this._shootTimer = 0
        }

        if (Math.random() < 0.1) {
            this.graphics.opacity = 0.6 + Math.random() * 0.6
        } else {
            this.graphics.opacity = 1
        }
    }
}
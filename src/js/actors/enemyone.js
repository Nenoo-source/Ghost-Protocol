import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { SpriteSheet, Animation } from "excalibur";
import { Resources } from '../resources.js'
import { Player1 } from "./player1/player1.js"
import { Player2 } from "./player2/player2.js"
import { Cookie } from "./enemyabilities/enemyabilityone.js"


export class Tv extends Actor {
    _shootTimer = 0

    constructor(x, y) {
        super({
            width: Resources.tv.width,
            height: Resources.tv.height
        })
        this.x = x
        this.y = y
    }

    onInitialize(engine) {
        this._shootTimer = 0

        this.graphics.use(Resources.tv.toSprite())
        this.scale = new Vector(0.16, 0.16)
        this.pos = new Vector(this.x, this.y)

        const walkSheet = SpriteSheet.fromImageSource({
            image: Resources.tvWalk,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 479,
                spriteHeight: 528
            }
        });

        const walkAnim = Animation.fromSpriteSheet(
            walkSheet,
            [0, 1, 2, 3],
            150
        );
        walkAnim.loop = true;

        this.graphics.use(walkAnim);

        //zwaartekracht
        this.body.useGravity = true
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.actions.repeat((repeatCtx) => {
            repeatCtx.moveBy(100, 0, 100)
            repeatCtx.moveBy(-100, 0, 100)
        },)

    }
    onCollisionStart(event, other) {
        if (other.owner instanceof Player1) {
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p1.pos = new Vector(100, 420)
        }
        if (other.owner instanceof Player2) {
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p2.pos = new Vector(200, 420)
        }
    }

    onPostUpdate(engine, delta) {
        this._shootTimer += delta

        if (this._shootTimer >= 4000) {
            const cookie = new Cookie(this.pos.x - 50, this.pos.y, -1)
            engine.currentScene.add(cookie)
            this._shootTimer = 0
        }
    }

    onPreUpdate(engine) {
        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = false;
        }

        if (this.vel.x < 0) {
            this.graphics.flipHorizontal = true;
        }
    }
}
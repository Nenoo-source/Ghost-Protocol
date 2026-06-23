import { Actor, CollisionType, DegreeOfFreedom, Vector } from "excalibur";
import { SpriteSheet, Animation } from "excalibur";
import { Resources } from '../resources.js';
import { Player1 } from "./player1/player1.js";
import { Player2 } from "./player2/player2.js";

export class Cable extends Actor {

    constructor() {
        super({
            width: 60,
            height: 110
        });
    }

    onInitialize(engine) {
        const walkSheet = SpriteSheet.fromImageSource({
            image: Resources.revenantWalk,
            grid: {
                rows: 2,
                columns: 2,
                spriteWidth: 128,
                spriteHeight: 128
            }
        });

        const walkAnim = Animation.fromSpriteSheet(
            walkSheet,
            [0, 1, 2, 3],
            150
        );
        walkAnim.loop = true;

        this.graphics.use(walkAnim);

        this.scale = new Vector(1.5, 1.5);
        this.pos = new Vector(800, 560);

        this.body.useGravity = true;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        // --- BEWEGING ---
        this.actions.repeat((repeatCtx) => {
            repeatCtx.moveBy(300, 0, 100);
            repeatCtx.moveBy(-300, 0, 100);
        });
    }

    onCollisionStart(event, other) {

        if (other.owner instanceof Player1) {
            Resources.Damagesound.play();
            this.scene.pb.safety -= 10;
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1);
            this.scene.p1.pos = new Vector(100, 540);
        }

        if (other.owner instanceof Player2) {
            Resources.Damagesound.play();
            this.scene.pb.safety -= 10;
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1);
            this.scene.p2.pos = new Vector(200, 540);
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

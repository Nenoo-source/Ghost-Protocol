import { Actor, CollisionType, DegreeOfFreedom, Vector } from "excalibur";
import { SpriteSheet, Animation } from "excalibur";
import { Resources } from '../resources.js';
import { Player1 } from "./player1/player1.js";
import { Player2 } from "./player2/player2.js";
import { ThreatScanner } from "./player1/1-ability1.js"

export class Ghost extends Actor {

    constructor() {
        super({
            width: 1050,
            height: 700
        });
    }

    onInitialize(engine) {
        this.health = 10
        this.healthPre = this.health

        this.graphics.use(Resources.Ghost.toSprite())

        this.scale = new Vector(0.5, 0.5);
        this.pos = new Vector(800, 450);

        this.body.useGravity = false;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        this.startX = 800;
        this.moveRange = 200;
        this.moveSpeed = 100;
        this.vel = new Vector(this.moveSpeed, 0);
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

        if (other.owner instanceof ThreatScanner) {
            this.health -= 1
            other.owner.kill()
        }
    }

    onPreUpdate(engine, delta) {

        if (this.pos.x >= this.startX + this.moveRange) {
            this.vel = new Vector(-this.moveSpeed, 0);
        }

        if (this.pos.x <= this.startX - this.moveRange) {
            this.vel = new Vector(this.moveSpeed, 0);
        }

        if (this.health < this.healthPre) {

            this.graphics.opacity = 0.4;

            this.actions.delay(200).callMethod(() => {
                this.graphics.opacity = 1;
            });

            this.healthPre = this.health;
        }

        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = false;
        }

        if (this.vel.x < 0) {
            this.graphics.flipHorizontal = true;
        }

        if (this.health <= 0) {
            this.kill()
        }
    }
}

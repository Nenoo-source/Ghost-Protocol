import { Actor, CollisionType, DegreeOfFreedom, Vector } from "excalibur";
import { SpriteSheet, Animation } from "excalibur";
import { Resources } from '../resources.js';
import { Player1 } from "./player1/player1.js";
import { Player2 } from "./player2/player2.js";
import { ThreatScanner } from "./player1/1-ability1.js"
import { Cursor } from "./enemyabilities/enemyabilitytwo.js"

export class Ghost extends Actor {

    constructor() {
        super({
            width: Resources.width,
            height: Resources.height
        });
    }

    onInitialize(engine) {
        this._shootTimer = 0

        this.health = 10
        this.healthPre = this.health

        this.graphics.use(Resources.Ghost.toSprite())

        this.scale = new Vector(0.8, 0.8);
        this.pos = new Vector(900, 450);

        this.body.useGravity = false;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        this.graphics.flipHorizontal = true

        this.collider.useCircleCollider(180);

        this.hoverTimer = 0;
    }

    onCollisionStart(event, other) {

        if (other.owner instanceof Player1) {
            Resources.Damagesound.play();
            this.scene.pb.safety -= 10;
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1);
            this.scene.p1.pos = new Vector(100, 540);
            this.scene.p1.grounded = false
        }

        if (other.owner instanceof Player2) {
            Resources.Damagesound.play();
            this.scene.pb.safety -= 10;
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1);
            this.scene.p2.pos = new Vector(200, 540);
            this.scene.p2.grounded = false
        }

        if (other.owner instanceof ThreatScanner) {
            this.health -= 1
            other.owner.kill()
        }
    }

    onPreUpdate(engine, delta) {
        this._shootTimer += delta

        if (this._shootTimer >= 4000) {
            const cursor = new Cursor(this.pos.x - 50, this.pos.y, -1)
            engine.currentScene.add(cursor)
            this._shootTimer = 0



            if (this.health < this.healthPre) {

                this.graphics.opacity = 0.4;

                this.actions.delay(200).callMethod(() => {
                    this.graphics.opacity = 1;
                });

                this.healthPre = this.health;
            }

            if (this.health <= 0) {
                this.kill()
            }
        }

        this.hoverTimer += delta * 0.002; // snelheid van de hover

        const amplitude = 20; // hoeveel pixels hij op en neer gaat
        const offsetY = Math.sin(this.hoverTimer) * amplitude;

        this.pos.y += Math.sin(this.hoverTimer) * 0.5; // 450 is jouw originele Y-positie

    }
}
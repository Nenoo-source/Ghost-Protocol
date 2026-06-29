import { Actor, Vector, Color, CollisionType } from "excalibur";
import { Resources } from '../../resources.js'
import { Player1 } from "../player1/player1"
import { Player2 } from "../player2/player2"
import { Player } from "../playerBase.js"


export class Rain extends Actor {

    constructor() {
        super();
        this.isActive = false;
        this.spawnInterval = 300;
        this.spawnTimer = 0;
    }

    onInitialize(engine) {
        this.engine = engine;
    }

    startRain() {
        this.isActive = true;
    }

    stopRain() {
        this.isActive = false;
    }

    onPreUpdate(engine, delta) {
        if (!this.isActive) return;

        this.spawnTimer += delta;

        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;

            const randomX = Math.random() * engine.drawWidth;
            const drop = new RainDrop(randomX, -50);
            engine.currentScene.add(drop);
        }
    }
}

export class RainDrop extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.cookie.width / 2.5,
            height: Resources.cookie.height,
            collisionType: CollisionType.Passive
        });

        this.fallSpeed = 600;
        // this.damage = 10;
    }

    onInitialize() {
        this.graphics.use(Resources.RainDrop.toSprite())
        this.scale = new Vector(0.08, 0.08)
    }

    onPreUpdate(engine, delta) {
        this.pos.y += this.fallSpeed * (delta / 1000);


        if (this.pos.y > engine.drawHeight + 100) {
            this.kill();
        }
    }


    onCollisionStart(event, other) {
        //    const other = ev.other;

        if (other.owner instanceof Player1) {
            this.kill()
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p1.pos = new Vector(100, 540)
            this.scene.p1.grounded = false
            console.log("hit")
        }
        if (other.owner instanceof Player2) {
            this.kill()
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p2.pos = new Vector(200, 540)
            this.scene.p2.grounded = false
            console.log("hit")
        }
    }
}
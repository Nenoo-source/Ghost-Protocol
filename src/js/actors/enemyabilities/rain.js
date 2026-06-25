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
            width: 20,
            height: 40,
            color: Color.Blue,
            collisionType: CollisionType.Passive
        });

        this.fallSpeed = 600;
        // this.damage = 10;
    }

    onPreUpdate(engine, delta) {
        this.pos.y += this.fallSpeed * (delta / 1000);


        if (this.pos.y > engine.drawHeight + 100) {
            this.kill();
        }
    }


    onCollisionStart(other, event) {
        //    const other = ev.other;

        if (other.owner instanceof Player1) {
            this.kill()
            other.owner.kill()
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p1.pos = new Vector(100, 540)
            console.log("hit")
        }
        if (other.owner instanceof Player2) {
            this.kill()
            other.owner.kill()
            Resources.Damagesound.play()
            this.scene.pb.safety -= 10
            this.scene.ui.safetybar.scale = new Vector(this.scene.pb.safety / 50, 1)
            this.scene.p2.pos = new Vector(100, 540)
            console.log("hit")
        }
    }
}
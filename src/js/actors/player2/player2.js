import { Animation, Vector } from "excalibur"
import { Resources } from "../../resources"
import { Player } from "../playerBase.js"
import { setupSuperJump, updateSuperJump } from "./2-ability1.js"
import { setupWarp, updateWarp } from "./2-ability2.js"
import { setupBlock, updateBlock } from "./2-ability3.js"

export class Player2 extends Player {

    constructor(player, x, y) {
        super({
            width: Resources.player2.width,
            height: Resources.player2.height
        })

        this.player = player
        this.x = x
        this.y = y
        this.other = null
    }

    onInitialize(engine) {
        super.onInitialize(engine)

        this.scale = new Vector(0.12, 0.12)
        this.idleGraphic = Resources.player2.toSprite()
        this.graphics.use(this.idleGraphic)

        const runScale = new Vector(0.8, 0.8)
        const run4 = Resources.Run4.toSprite()
        const run5 = Resources.Run5.toSprite()
        const run6 = Resources.Run6.toSprite()
        run4.scale = runScale
        run5.scale = runScale
        run6.scale = runScale

        this.runGraphic = new Animation({
            frames: [
                { graphic: run4, duration: 120 },
                { graphic: run5, duration: 120 },
                { graphic: run6, duration: 120 }
            ]
        })
        this.runGraphic.loop = true

        this.jumpGraphic = new Animation({
            frames: [
                { graphic: Resources.Jump5.toSprite(), duration: 120 },
                { graphic: Resources.Jump6.toSprite(), duration: 120 }
            ]
        })
        this.jumpGraphic.loop = true

        const blockRunScale = new Vector(0.8, 0.8)
        const blockRun1 = Resources.runningDevensiveState1.toSprite()
        const blockRun2 = Resources.runningDevensiveState2.toSprite()
        blockRun1.scale = blockRunScale
        blockRun2.scale = blockRunScale

        this.blockRunGraphic = new Animation({
            frames: [
                { graphic: blockRun1, duration: 120 },
                { graphic: blockRun2, duration: 120 }
            ]
        })
        this.blockRunGraphic.loop = true

        this.pos = new Vector(this.x, this.y)

        setupSuperJump(this)
        setupWarp(this)
        setupBlock(this)
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta)

        if (this.player !== "player2") {
            return
        }

        // Graphics
        if (!this.grounded && this.jumpGraphic && this.currentGraphic !== "jump") {
            this.graphics.use(this.jumpGraphic)
            this.currentGraphic = "jump"
        } else if (this.grounded && this.xspeed !== 0) {
            if (this.runGraphic && this.currentGraphic !== "run") {
                this.graphics.use(this.runGraphic)
                this.currentGraphic = "run"
            }
        } else if (this.grounded) {
            if (this.idleGraphic && this.currentGraphic !== "idle") {
                this.graphics.use(this.idleGraphic)
                this.currentGraphic = "idle"
            }
        }

        updateSuperJump(this, engine, delta)
        updateWarp(this, engine, delta)
        updateBlock(this, engine, delta)
    }
}
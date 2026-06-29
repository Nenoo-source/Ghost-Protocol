import { Vector } from "excalibur"
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

        this.runGraphic = this.idleGraphic
        this.jumpGraphic = this.idleGraphic

        this.currentGraphic = "idle"
        this.pos = new Vector(this.x, this.y)

        setupSuperJump(this)
        setupWarp(this)
        setupBlock(this)
        setupUltimate(this)
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta)

        if (this.player !== "player2") {
            return
        }

        updateSuperJump(this, engine, delta)
        updateWarp(this, engine, delta)
        updateBlock(this, engine, delta)
        updateUltimate(this, engine, delta)
    }
}
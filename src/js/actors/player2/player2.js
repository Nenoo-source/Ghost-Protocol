import { Vector } from "excalibur"
import { Resources } from "../../resources"
import { Player } from "../playerBase.js"

import { setupSuperJump, updateSuperJump } from "./2-ability1.js"
import { setupWarp, updateWarp } from "./2-ability2.js"
import { setupBlock, updateBlock } from "./2-ability3.js"
import { setupUltimate, updateUltimate } from "./2-ability4.js"

export class Player2 extends Player {

    constructor(player) {
        super({
            width: Resources.player2.width,
            height: Resources.player2.height
        })

        this.player = player
        this.other = null
    }

    onInitialize(engine) {
        super.onInitialize(engine)

        this.scale = new Vector(0.12, 0.12)
        this.graphics.use(Resources.player2.toSprite())
        this.pos = new Vector(200, 540)

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
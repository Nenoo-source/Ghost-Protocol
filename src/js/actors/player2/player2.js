import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"
import { Ground } from '../ground.js'
import { Player } from '../playerBase.js'

import { setupSuperJump, updateSuperJump } from './2-ability1.js'
import { setupWarp, updateWarp } from './2-ability2.js'
import { setupBlock, updateBlock } from './2-ability3.js'
import { setupUltimate, updateUltimate } from './2-ability4.js'

export class Player2 extends Player {

    constructor(player) {
        super({
            width: Resources.player2.width,
            height: Resources.player2.height
        })
        this.player = player
        this.other = null // referentie naar player1, instellen vanuit de Scene (zie onderaan)
    }

    onInitialize(engine) {
        super.onInitialize(engine)

        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.player2.toSprite())
        this.pos = new Vector(200, 540)

        // abilities initialiseren
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

        // abilities updaten (toetsen 7, 8, 9, 0)
        updateSuperJump(this, engine, delta)
        updateWarp(this, engine, delta)
        updateBlock(this, engine, delta)
        updateUltimate(this, engine, delta)
    }
}

// Belangrijk: ergens in de Scene waar player1 en player2 worden aangemaakt,
// moet de referentie naar elkaar gezet worden zodat de warp-ability weet
// waar player1 is, bijvoorbeeld:
//
//   const player1 = new Player1("player1")
//   const player2 = new Player2("player2")
//   player2.other = player1
//   this.add(player1)
//   this.add(player2)
import { Actor, Keys, Vector } from "excalibur"
import { Resources } from "../../resources"

export class Player2 extends Actor {
    #facingLeft = false
    #isMovingHorizontally = false

    constructor() {
        super({
            width: Resources.player2.width,
            height: Resources.player2.height
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.player2.toSprite())
        this.pos = new Vector(100, 200)
        this.scale = new Vector(1, 1)
    }

    onPreUpdate(engine, dt) {
        this.#handleInput(engine, dt / 1000)
    }

    #handleInput(engine, dt) {
        const kb = engine.input.keyboard
        const speed = 300

        if (kb.isHeld(Keys.J)) {
            this.pos.x -= speed * dt
            this.#facingLeft = true
            this.#isMovingHorizontally = true
        } else if (kb.isHeld(Keys.L)) {
            this.pos.x += speed * dt
            this.#facingLeft = false
            this.#isMovingHorizontally = true
        } else {
            this.#isMovingHorizontally = false
        }

        this.graphics.flipHorizontal = this.#facingLeft

        if (this.pos.x < 40) this.pos.x = 40
        if (this.pos.x > 1240) this.pos.x = 1240

        if (kb.wasPressed(Keys.I)) {
            this.jump()
        }

        if (kb.isHeld(Keys.K)) {
            this.slide()
        }
    }

    jump() {
        console.log("Player2 jumps")
    }

    slide() {
        console.log("Player2 slides")
    }
}
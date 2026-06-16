import { Actor } from "excalibur"

export class Player2 extends Actor{


#handleInput(engine, dt) {
        const kb    = engine.input.keyboard
        const speed = 300

        if (kb.isHeld(ex.Keys.ArrowLeft) || kb.isHeld(ex.Keys.A)) {
            this.pos.x -= speed * dt
            this.#facingLeft = true
            this.#isMovingHorizontally = true
        } else if (kb.isHeld(ex.Keys.ArrowRight) || kb.isHeld(ex.Keys.D)) {
            this.pos.x += speed * dt
            this.#facingLeft = false
            this.#isMovingHorizontally = true
        } else {
            this.#isMovingHorizontally = false
        }

        const flip = this.#facingLeft
        Object.values(this.#animations).forEach(s => {
            if (s) s.flipHorizontal = flip
        })

        if (this.pos.x < 40)   this.pos.x = 40
        if (this.pos.x > 1240) this.pos.x = 1240

        if (kb.wasPressed(ex.Keys.Space)   ||
            kb.wasPressed(ex.Keys.ArrowUp) ||
            kb.wasPressed(ex.Keys.W)) {
            this.jump()
        }

        if (kb.isHeld(ex.Keys.ArrowDown) || kb.isHeld(ex.Keys.S)) {
            this.slide()
        }
    }

    #tickTimers(delta) {
        if (this.isSliding) {
            this.#slideTimer -= delta
            if (this.#slideTimer <= 0) {
                this.isSliding     = false
                this.#currentState = null
            }
        }
        if (this.#isImmune) {
            this.#hurtTimer -= delta
            if (this.#hurtTimer <= 0) {
                this.#isImmune     = false
                this.#currentState = null
            }
        }
    }
}
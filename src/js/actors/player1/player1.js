import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, randomInRange } from "excalibur"
import { Resources } from  "../../resources"

export class player1 extends Actor {

    constructor() {
        super({
            width: Resources.Hook.width,
            height: Resources.Hook.height
        })

    }
    onInitialize(engine) {
        this.graphics.use(Resources.player1.toSprite())
        this.pos = new Vector(640, -200)
        this.scale = new Vector(0.5, 0.5)
    }


    onPreUpdate(engine) {

        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(this.controls.right)) {
            xspeed += this.speed
        }
        if (engine.input.keyboard.isHeld(this.controls.left)) {
            xspeed -= this.speed
        }
        if (engine.input.keyboard.isHeld(this.controls.up)) {
            yspeed -= this.speed
        }
        if (engine.input.keyboard.isHeld(this.controls.down)) {
            yspeed += this.speed
        }
        console.log(xspeed, yspeed)
        this.vel = new Vector(xspeed, yspeed)



        if (xspeed !== 0) {
            this.graphics.flipHorizontal = xspeed < 0
        }
    }
}
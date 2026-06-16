import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode } from "excalibur"
import { Resources } from "../../resources"

export class player1 extends Actor {

    constructor() {
        super({
            width: Resources.player1.width,
            height: Resources.player1.height
        })

    }
    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.player1.toSprite())
        this.pos = new Vector(100, 560)
    }


    onPreUpdate(engine) {

        let xspeed = 0
        let yspeed = 0
        this.speed = 300
        this.speed = 300

        if (engine.input.keyboard.isHeld(Keys.D)) {
            xspeed += this.speed
        }
        if (engine.input.keyboard.isHeld(Keys.A)) {
            xspeed -= this.speed
        }

        console.log(xspeed, yspeed)
        this.vel = new Vector(xspeed, yspeed)



        if (xspeed !== 0) {
            this.graphics.flipHorizontal = xspeed < 0
        }
    }
}
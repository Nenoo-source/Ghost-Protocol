import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode } from "excalibur"
import { Resources } from "../../resources"

export class player2 extends Actor {

    constructor() {
        super({
            width: Resources.player2.width,
            height: Resources.player2.height
        })

    }
    onInitialize(engine) {
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(Resources.player2.toSprite())
        this.pos = new Vector(100, 540)
    }


    onPreUpdate(engine) {

        let xspeed = 0
        let yspeed = 0
        this.speed = 300

        if (engine.input.keyboard.isHeld(Keys.L)) {
            xspeed += this.speed
        }
        if (engine.input.keyboard.isHeld(Keys.J)) {
            xspeed -= this.speed
        }

        console.log(xspeed, yspeed)
        this.vel = new Vector(xspeed, yspeed)



        if (xspeed !== 0) {
            this.graphics.flipHorizontal = xspeed < 0
        }
    }
}
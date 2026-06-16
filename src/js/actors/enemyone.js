import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, randomInRange } from "excalibur"
import { Resources } from '../resources.js'

export class tv extends Actor {
    constructor() {
        super({
            width: Resources.tv.width,
            height: Resources.tv.height
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.tv.toSprite())
        //   this.graphics.flipHorizontal = true
        this.pos = new Vector(700, 560)
        this.actions.repeat((repeatCtx) => {
            repeatCtx.moveBy(300, 0, 100)
            repeatCtx.moveBy(-300, 0, 100)
        },)
    }

}
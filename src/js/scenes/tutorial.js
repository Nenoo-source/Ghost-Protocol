import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, Text } from "excalibur"
import { Resources } from "../resources.js"

export class TutorialScene extends Scene {
    onInitialize(engine) {
        const tutorial = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            z: -1,
        })
        tutorial.graphics.use(Resources.Tutorial.toSprite())
        this.add(tutorial)
        .scale = new Vector(0.85, 0.8)

    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
        engine.goToScene("game", {
                sourceOut: new FadeInOut({ duration: 600, direction: 'out' }),
                destinationIn: new FadeInOut({ duration: 600, direction: 'in' })
            })
        }
    }

}
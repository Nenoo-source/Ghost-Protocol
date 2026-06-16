import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class StartScene extends Scene {
    onInitialize(engine) {
        const background = new Actor({
            // Background position
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            z: -1,
        })
        background.graphics.use(Resources.Background.toSprite())
        this.add(background)
        background.scale = new Vector(0.85, 0.8)


        //title
        const title = new Label({
            text: "Ghost Protocol",
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight - 200),
            font: new Font({
                size: 64,
                unit: FontUnit.Px,
                color: Color.fromHex('#FFF8E1'),
                strokeColor: Color.fromHex('#ff0000'),
                lineWidth: 3,
            })
        })
        title.anchor = new Vector(0.5, 0.5)
        this.add(title)

        //instruction
        const instruction = new Label({
            text: "Press space to start",
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            font: new Font({
                size: 64,
                unit: FontUnit.Px,
                color: Color.fromHex('#FFF8E1'),
                strokeColor: Color.fromHex('#ff0000'),
                lineWidth: 3,
            })
        })
        instruction.anchor = new Vector(0.5, 0.5)
        this.add(instruction)

    }


    // Go to game start
    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene("game", {
                // transition
                sourceOut: new FadeInOut({ duration: 600, direction: 'out' }),
                destinationIn: new FadeInOut({ duration: 600, direction: 'in' })
            })
        }
    }
}

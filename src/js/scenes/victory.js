import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, Text } from "excalibur"
import { Resources } from "../resources.js"

export class Victory extends Scene {
    onInitialize(engine) {
        const background = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            z: -1,
        })
        background.graphics.use(Resources.Victory.toSprite())
        this.add(background)
        background.scale = new Vector(0.85, 0.8)

        // title
        const title = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight + 40),
            anchor: new Vector(0.5, 0.8)
        })

        title.graphics.use(new Text({
            text:
                "Press space to play again",
            font: new Font({
                family: "Orbitron",
                size: 30,
                unit: FontUnit.Px,
                color: Color.fromHex('#E0E0E0'),
                strokeColor: Color.fromHex("#a8e1fb"),
            })
        }))

        this.add(title)
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            window.location.reload()
        }
    }
}
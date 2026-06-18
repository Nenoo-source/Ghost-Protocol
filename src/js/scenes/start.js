import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, Text } from "excalibur"
import { Resources } from "../resources.js"

export class StartScene extends Scene {
    onInitialize(engine) {
        const background = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            z: -1,

        })
        background.graphics.use(Resources.start.toSprite())
        this.add(background)
        background.scale = new Vector(0.85, 0.8)
        Resources.Menumusic.loop = true;
        Resources.Menumusic.play()

        // title
        const title = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight + 40),
            anchor: new Vector(0.5, 0.8)
        })

        title.graphics.use(new Text({
            text:
                "In today's connected world, the risks of getting hacked and\n" +
                "cyber attacks are higher than ever.\n\n" +
                "\"Ghost Protocol\" will immerse you in a world of cyber\n" +
                "espionage where your mission is to outsmart the hackers\n" +
                "and keep your personal data safe.\n\n" +
                "Through gameplay you'll learn the importance of making sure\n" +
                "your own data stays out of the wrong hands.",
            font: new Font({
                family: "Orbitron",
                size: 24,
                unit: FontUnit.Px,
                color: Color.fromHex('#E0E0E0'),
                strokeColor: Color.fromHex("#a8e1fb"),
            })
        }))

        this.add(title)
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

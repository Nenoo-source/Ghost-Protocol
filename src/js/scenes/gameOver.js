import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, Text } from "excalibur"
import { Resources } from "../resources.js"

export class GameOver extends Scene {
    onInitialize(engine) {
        const background = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            z: -1,
        })
        background.graphics.use(Resources.GameOver.toSprite())
        this.add(background)
        background.scale = new Vector(0.85, 0.8)
        Resources.Ezdiffmusic1?.stop()
        Resources.Menumusic?.stop()
        Resources.GameOverMusic.loop = true;
        Resources.GameOverMusic.play()
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene("start", {
                sourceOut: new FadeInOut({ duration: 600, direction: 'out' }),
                destinationIn: new FadeInOut({ duration: 600, direction: 'in' })
            })
        }
    }

    onActivate(context) {
        const safetyFromLevelTwo = context.data.safety

        this.pb.safety = safetyFromLevelTwo
        this.ui.safetybar.scale = new Vector(this.pb.safety / 50, 1)
    }

    onDeactivate(engine) {
        Resources.Menumusic.stop()
    }
}
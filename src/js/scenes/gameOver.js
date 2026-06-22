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
        Resources.Menumusic.loop = true;
        Resources.Menumusic.play()
    }

    onDeactivate(engine) {
        Resources.Menumusic.stop()
    }
}
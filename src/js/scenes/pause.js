import { Actor, Color, FadeInOut, Font, FontUnit, Keys, Scene, Vector, Text, Rectangle } from "excalibur"
import { Resources } from "../resources.js"

export class PauseScene extends Scene {
    onInitialize(engine) {
        const overlay = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            z: 1000,
        })
        overlay.graphics.use(new Rectangle({
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: new Color(0, 0, 0, 0),

        }))
        this.add(overlay)

        const text = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight - 40),
            anchor: new Vector(0.5, 0.5),
            z: 1001,
        })
        text.graphics.use(new Text({
            text:
                "GAME PAUZE\n\n" +
                "Space = hervatten\n" +
                "R = opnieuw beginnen\n" +
                "Esc = terug naar start",
            font: new Font({
                family: "Arial",
                size: 28,
                unit: FontUnit.Px,
                color: Color.fromHex('#ffffff'),
                strokeColor: Color.fromHex('#4a98d6'),
                strokeThickness: 2,
            }),
            textAlign: "center",
        }))
        this.add(text)
    }

    onActivate(context) {
        this.prevSceneName = context.data?.prevSceneName || context.previousScene?.sceneName || "game"
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene(this.prevSceneName, {
                sourceOut: new FadeInOut({ duration: 400, direction: 'out' }),
                destinationIn: new FadeInOut({ duration: 400, direction: 'in' }),
            })
             console.log(`going to scene ${this.prevSceneName}`)
        }
        if (engine.input.keyboard.wasPressed(Keys.R)) {
            window.location.reload()
        }
        if (engine.input.keyboard.wasPressed(Keys.Escape)) {
            engine.goToScene("start", {
                sourceOut: new FadeInOut({ duration: 400, direction: 'out' }),
                destinationIn: new FadeInOut({ duration: 400, direction: 'in' }),
            })
        }
    }
}

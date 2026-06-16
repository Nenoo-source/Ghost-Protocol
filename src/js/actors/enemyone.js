import { Actor, Engine, Scene, Vector, DisplayMode, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class tv extends actor {
    constructor() {
        super({
            width: Resources.Hook.width,
            height: Resources.Hook.height
        })
    }
}
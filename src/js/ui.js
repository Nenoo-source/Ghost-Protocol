import { Actor, ScreenElement, Vector, randomInRange, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from "./resources"
import { SafetyOutline } from "./actors/safetyOutline"

export class UI extends ScreenElement {

    constructor() {
        super();
    }

    onInitialize(engine) {
        this.topMidX = 640
        this.topMidY = 10

        this.safetybarBack = new Actor({ x: this.topMidX - 112.5, y: this.topMidY, color: Color.fromHex('#000000ff'), width: 225, height: 20, anchor: new Vector(0, 0) })
        this.addChild(this.safetybarBack)
        this.safetybar = new Actor({ x: this.topMidX - 112.5, y: this.topMidY, color: Color.fromHex('#48cae4'), width: 112.5, height: 20, anchor: new Vector(0, 0) })
        this.addChild(this.safetybar)

        this.outline = new SafetyOutline(this.topMidX, this.topMidY + 15)
        this.addChild(this.outline)

        
        const blockSprite = Resources.BlockUI.toSprite()
        this.graphics.use(blockSprite)
        this.pos = new Vector(engine.drawWidth + 80, engine.drawHeight + 80)
    }
}   
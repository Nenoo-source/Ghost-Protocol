import {
    Actor,
    ScreenElement,
    Vector,
    randomInRange,
    Color,
    Label,
    Font,
    FontUnit,
} from "excalibur";
import { Resources } from "./resources";
import { SafetyOutline } from "./actors/safetyOutline";

export class UI extends ScreenElement {
    constructor() {
        super();
    }

    onInitialize(engine) {
        this.topMidX = 640;
        this.topMidY = 10;

        this.safetybarBack = new Actor({
            x: this.topMidX - 112.5,
            y: this.topMidY,
            color: Color.fromHex("#000000ff"),
            width: 225,
            height: 20,
            anchor: new Vector(0, 0),
        });
        this.addChild(this.safetybarBack);
        this.safetybar = new Actor({
            x: this.topMidX - 112.5,
            y: this.topMidY,
            color: Color.fromHex("#48cae4"),
            width: 112.5,
            height: 20,
            anchor: new Vector(0, 0),
        });
        this.addChild(this.safetybar);
    
        
        this.outline = new SafetyOutline(this.topMidX, this.topMidY + 15);
        this.addChild(this.outline);

        const blockSprite = Resources.BlockUI.toSprite();
        blockSprite.scale = new Vector(0.15, 0.15);

        this.blockIcon = new ScreenElement({
            x: engine.drawWidth - 200,
            y: engine.drawHeight - 118,
        });
        this.blockIcon.graphics.use(blockSprite);
        this.addChild(this.blockIcon);


        const attackSprite = Resources.AttackUI.toSprite();
        attackSprite.scale = new Vector(0.08, 0.08);

        this.attackIcon = new ScreenElement({
            x: 70,
            y: engine.drawHeight - 92,
        });
        this.attackIcon.graphics.use(attackSprite);
        this.addChild(this.attackIcon);

        const warpSprite = Resources.WarpUI.toSprite();
        warpSprite.scale = new Vector(0.15, 0.15);

        this.warpIcon = new ScreenElement({
            x: engine.drawWidth - 300,
            y: engine.drawHeight - 120,
        });
        this.warpIcon.graphics.use(warpSprite);
        this.addChild(this.warpIcon);


        const superJumpSprite = Resources.superJumpUI.toSprite();
        superJumpSprite.scale = new Vector(0.13, 0.13   );

        this.superJumpIcon = new ScreenElement({
            x: engine.drawWidth - 400,
            y: engine.drawHeight - 105,
        });
        this.superJumpIcon.graphics.use(superJumpSprite);
        this.addChild(this.superJumpIcon);

    }

    onPreUpdate() {
        if (this.scene.p1.cooldown1) {
            this.attackIcon.graphics.opacity = 0.4
        } else {
            this.attackIcon.graphics.opacity = 1
        }

        if (this.scene.p2.superJumpCooldownRemaining > 0) {
            this.superJumpIcon.graphics.opacity = 0.4
        } else {
            this.superJumpIcon.graphics.opacity = 1
        }

        if (this.scene.p2.warpCooldownRemaining > 0) {
            this.warpIcon.graphics.opacity = 0.4
        } else {
            this.warpIcon.graphics.opacity = 1
        }
    }
}

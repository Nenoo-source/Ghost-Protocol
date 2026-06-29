import { Keys } from "excalibur"
import { Resources } from "../../resources.js"

// Ability 3: Block (key 9)

const BLOCK_DURATION = 2000 // ms
const BLOCK_COOLDOWN = 3000 // ms

export function setupBlock(player) {
    player.blockType = 1
    player.blocking = false
    player.blockTimer = 0
    player.blockCooldown = 0
}

export function updateBlock(player, engine, delta) {
    const blockKeyPressed =
        engine.input.keyboard.wasPressed(Keys.Digit9) ||
        engine.input.keyboard.wasPressed(Keys.Num9)

    if (player.blockCooldown > 0) {
        player.blockCooldown -= delta
    }

    if (blockKeyPressed && !player.blocking && player.blockCooldown <= 0) {
        player.blocking = true
        player.blockTimer = BLOCK_DURATION
        player.graphics.use(Resources.defensiveState.toSprite())
    }

    if (player.blocking) {
        if (player.xspeed !== 0 && player.blockRunGraphic) {
            player.graphics.use(player.blockRunGraphic)
        } else {
            player.graphics.use(Resources.defensiveState.toSprite())
        }
        player.blockTimer -= delta
        if (player.blockTimer <= 0) {
            player.blocking = false
            player.blockTimer = 0
            player.blockCooldown = BLOCK_COOLDOWN
            player.currentGraphic = ""
        }
    }
}

export function isBlocking(player) {
    return player.blocking === true
}

export function getBlockType(player) {
    return player.blockType
}

export function isCorrectBlock(player, attackBlockType) {
    return isBlocking(player)
}
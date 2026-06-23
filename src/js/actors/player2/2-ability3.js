import { Keys } from "excalibur"
import { Resources } from "../../resources.js"

// Ability 3: Block (key 9)

const BLOCK_TYPES_COUNT = 4

export function setupBlock(player) {
    player.blockType = 1
    player.blocking = false
    player.pendingBlockTap = false
    player.blockHoldTimer = 0
}

export function updateBlock(player, engine, delta) {
    const HOLD_THRESHOLD = 120

    const blockKeyHeld =
        engine.input.keyboard.isHeld(Keys.Digit9) ||
        engine.input.keyboard.isHeld(Keys.Num9)

    const blockKeyPressed =
        engine.input.keyboard.wasPressed(Keys.Digit9) ||
        engine.input.keyboard.wasPressed(Keys.Num9)

    const blockKeyReleased =
        engine.input.keyboard.wasReleased(Keys.Digit9) ||
        engine.input.keyboard.wasReleased(Keys.Num9)

    if (blockKeyPressed && !player.blocking) {
        player.pendingBlockTap = true
        player.blockHoldTimer = 0
        player.blocking = true

        // start blocking right away on tap
        player.graphics.use(Resources.defensiveState.toSprite())
    }

    if (blockKeyHeld) {
        player.blockHoldTimer += delta

        if (player.blockHoldTimer >= HOLD_THRESHOLD) {
            player.blocking = true
            player.pendingBlockTap = false

            // show glowing defensive/blocking sprite
            player.graphics.use(Resources.defensiveState.toSprite())
        }
    }

    if (blockKeyReleased) {
        if (player.pendingBlockTap && player.blockHoldTimer < HOLD_THRESHOLD) {
            cycleBlockType(player)
        }

        player.blocking = false
        player.blockHoldTimer = 0
        player.pendingBlockTap = false

        // return to normal player2 sprite
        player.graphics.use(Resources.player2.toSprite())
    }
}

function cycleBlockType(player) {
    player.blockType = (player.blockType % BLOCK_TYPES_COUNT) + 1
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
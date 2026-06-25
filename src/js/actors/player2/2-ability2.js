import { Keys, Vector } from "excalibur"
import { Resources } from "../../resources"

// Ability 2: Warp met key 8

const WARP_COOLDOWN = 3000
const WARP_OFFSET_X = 80
const WARP_OFFSET_Y = -10

export function setupWarp(player) {
    player.warpCooldownRemaining = 0
}

export function updateWarp(player, engine, delta) {
    if (player.warpCooldownRemaining > 0) {
        player.warpCooldownRemaining -= delta

        if (player.warpCooldownRemaining < 0) {
            player.warpCooldownRemaining = 0
        }
    }

    if (
        engine.input.keyboard.wasPressed(Keys.Digit8) ||
        engine.input.keyboard.wasPressed(Keys.Num8)
    ) {
        tryActivateWarp(player)
    }
}

function tryActivateWarp(player) {
    if (player.warpCooldownRemaining > 0) {
        return false
    }

    const player1 = player.other

    if (!player1) {
        console.warn("Warp werkt niet: player2.other is niet ingesteld op player1.")
        return false
    }

    const direction = player.graphics.flipHorizontal ? -1 : 1

    const targetPos = new Vector(
        player.pos.x + direction * WARP_OFFSET_X,
        player.pos.y + WARP_OFFSET_Y
    )

    player1.pos = targetPos
    player1.vel = new Vector(0, player1.vel.y)
    Resources.Teleport.play()

    player.warpCooldownRemaining = WARP_COOLDOWN

    return true
}

export function isWarpReady(player) {
    return player.warpCooldownRemaining <= 0
}
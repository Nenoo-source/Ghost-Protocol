import { Keys, Vector } from "excalibur"

// Ability 1: Super Jump (key 7)
// Veel sterkere sprong dan de normale jump, alleen vanaf de grond, met cooldown.

const SUPER_JUMP_FORCE = 900       // sterkte van de super jump (normale jump = 350)
const SUPER_JUMP_COOLDOWN = 3000   // cooldown in ms

export function setupSuperJump(player) {
    player.superJumpCooldownRemaining = 0
}

export function updateSuperJump(player, engine, delta) {
    // cooldown aftellen
    if (player.superJumpCooldownRemaining > 0) {
        player.superJumpCooldownRemaining -= delta
        if (player.superJumpCooldownRemaining < 0) {
            player.superJumpCooldownRemaining = 0
        }
    }

    if (engine.input.keyboard.wasPressed(Keys.Digit7) || engine.input.keyboard.wasPressed(Keys.Num7)) {
        tryActivateSuperJump(player)
    }
}

function tryActivateSuperJump(player) {
    if (player.superJumpCooldownRemaining > 0) {
        // nog niet beschikbaar
        return false
    }

    if (!player.grounded) {
        // alleen vanaf de grond
        return false
    }

    player.body.applyLinearImpulse(new Vector(0, -SUPER_JUMP_FORCE))
    player.superJumpCooldownRemaining = SUPER_JUMP_COOLDOWN

    return true
}

export function isSuperJumpReady(player) {
    return player.superJumpCooldownRemaining <= 0
}
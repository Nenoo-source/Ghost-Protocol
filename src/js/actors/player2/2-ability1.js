import { Keys, Vector } from "excalibur"
import { Resources } from "../../resources.js"

// Ability 1: Super Jump (key 7)
// Veel sterkere sprong dan de normale jump, alleen vanaf de grond, met cooldown.

// LET OP: de normale jump in playerBase.js gebruikt "-350 * delta" als impulse,
// waarbij delta de frametijd in ms is (~16.67 bij 60fps). Dat is dus geen vaste
// kracht maar een kracht die met de frametijd meeschaalt. De super jump moet
// dezelfde "* delta" opzet gebruiken, anders is hij (per ongeluk) veel zwakker
// dan de normale jump in plaats van sterker.
const SUPER_JUMP_MULTIPLIER = 350 * 1.5  // 2.5x sterker dan de normale jump (normaal = 350)
const SUPER_JUMP_COOLDOWN = 3000         // cooldown in ms

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
        tryActivateSuperJump(player, delta)
        
    }
}

function tryActivateSuperJump(player, delta) {
    if (player.superJumpCooldownRemaining > 0) {
        // nog niet beschikbaar
        return false
    }

    if (!player.grounded) {
        // alleen vanaf de grond
        return false
    }

    // zelfde patroon als de normale jump in playerBase.js: kracht * delta
    player.body.applyLinearImpulse(new Vector(0, -SUPER_JUMP_MULTIPLIER * delta))
    player.superJumpCooldownRemaining = SUPER_JUMP_COOLDOWN
    Resources.Superjumpsound.play()
    return true
}

export function isSuperJumpReady(player) {
    return player.superJumpCooldownRemaining <= 0
}
import { Keys, Vector } from "excalibur"

// Ability 2: Warp (key 8)
// Teleporteert player1 naar een positie net naast/voor player2 (offset),
// zodat player2 hem dichterbij kan halen voor verdediging.

const WARP_COOLDOWN = 3000   // cooldown in ms
const WARP_OFFSET_X = 80     // horizontale afstand tussen player2 en de plek waar player1 landt
const WARP_OFFSET_Y = 0      // verticale offset (0 = zelfde hoogte als player2)

export function setupWarp(player) {
    player.warpCooldownRemaining = 0
}

export function updateWarp(player, engine, delta) {
    // cooldown aftellen
    if (player.warpCooldownRemaining > 0) {
        player.warpCooldownRemaining -= delta
        if (player.warpCooldownRemaining < 0) {
            player.warpCooldownRemaining = 0
        }
    }

    if (engine.input.keyboard.wasPressed(Keys.Digit8) || engine.input.keyboard.wasPressed(Keys.Num8)) {
        tryActivateWarp(player)
    }
}

function tryActivateWarp(player) {
    if (player.warpCooldownRemaining > 0) {
        // nog niet beschikbaar
        return false
    }

    const player1 = player.other
    if (!player1) {
        // geen referentie naar player1 ingesteld, kan niet warpen
        console.warn("Warp: player.other (player1) is niet ingesteld op player2.")
        return false
    }

    // bepaal aan welke kant player1 moet landen, gebaseerd op waar player2 kijkt
    const direction = player.graphics.flipHorizontal ? -1 : 1
    const targetPos = new Vector(
        player.pos.x + (direction * WARP_OFFSET_X),
        player.pos.y + WARP_OFFSET_Y
    )

    player1.pos = targetPos
    // snelheid resetten zodat player1 niet doorschiet na de warp
    player1.vel = new Vector(0, player1.vel.y)

    player.warpCooldownRemaining = WARP_COOLDOWN

    return true
}

export function isWarpReady(player) {
    return player.warpCooldownRemaining <= 0
}
import { Keys } from "excalibur"

// Ability 3: Block (key 9)
// 4 verschillende block-types, 1 voor elke aanval (aanvalsnamen volgen nog).
// Tikken op 9 wisselt het geselecteerde blocktype (1 -> 2 -> 3 -> 4 -> 1).
// Ingedrukt houden van 9 activeert het blokken met het huidige geselecteerde type.
//
// Later, als de aanvallen bekend zijn, kan de collision/attack-code controleren:
//   isBlocking(player) -> true/false
//   getBlockType(player) -> 1, 2, 3 of 4
// en vergelijken of het juiste blocktype actief was toen de aanval raakte.
// Bij een juiste block kan onSuccessfulBlock(player) aangeroepen worden
// (zie 2-ability4.js) om de ult-lading 10% extra te laten stijgen.

const BLOCK_TYPES_COUNT = 4

export function setupBlock(player) {
    player.blockType = 1        // huidig geselecteerd blocktype (1-4)
    player.blocking = false     // is de player op dit moment aan het blokken
}

export function updateBlock(player, engine, delta) {
    const blockKeyHeld = engine.input.keyboard.isHeld(Keys.Digit9) || engine.input.keyboard.isHeld(Keys.Num9)
    const blockKeyPressed = engine.input.keyboard.wasPressed(Keys.Digit9) || engine.input.keyboard.wasPressed(Keys.Num9)
    const blockKeyReleased = engine.input.keyboard.wasReleased(Keys.Digit9) || engine.input.keyboard.wasReleased(Keys.Num9)

    // tik = wissel blocktype, alleen als je nog niet aan het blokken was
    if (blockKeyPressed && !player.blocking) {
        player.pendingBlockTap = true
        player.blockHoldTimer = 0
    }

    if (blockKeyHeld) {
        player.blockHoldTimer = (player.blockHoldTimer || 0) + delta

        // zodra de toets lang genoeg ingedrukt is, gaan we naar "blocking" state
        // (kleine drempel zodat een korte tik alleen wisselt en geen block triggert)
        const HOLD_THRESHOLD = 120 // ms
        if (player.blockHoldTimer >= HOLD_THRESHOLD) {
            player.blocking = true
            player.pendingBlockTap = false
        }
    }

    if (blockKeyReleased) {
        if (player.pendingBlockTap) {
            // was een korte tik: wissel het blocktype
            cycleBlockType(player)
        }
        player.blocking = false
        player.blockHoldTimer = 0
        player.pendingBlockTap = false
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

// Helper voor latere attack-resolution code: geeft true terug als het
// huidige blocktype overeenkomt met het type aanval dat de player blokt.
// attackBlockType is het blocktype (1-4) dat bij een specifieke aanval hoort.
export function isCorrectBlock(player, attackBlockType) {
    return isBlocking(player) && player.blockType === attackBlockType
}
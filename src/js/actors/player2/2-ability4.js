import { Keys } from "excalibur"

// Ability 4: Ultimate - Firewall (key 0)
// Lading (ultCharge) gaat van 0% naar 100%.
// Passief: +1% per seconde.
// Bij elke juiste block (zie 2-ability3.js): +10% extra lading.
// Bij 100% kan de ult geactiveerd worden met 0.

const MAX_CHARGE = 100
const PASSIVE_CHARGE_PER_SECOND = 1     // 1% per seconde
const CHARGE_PER_CORRECT_BLOCK = 10     // +10% per juiste block
const FIREWALL_DURATION = 5000          // hoe lang de firewall actief blijft, in ms

export function setupUltimate(player) {
    player.ultCharge = 0
    player.firewallActive = false
    player.firewallTimeRemaining = 0
}

export function updateUltimate(player, engine, delta) {
    // firewall actieve duur aftellen
    if (player.firewallActive) {
        player.firewallTimeRemaining -= delta
        if (player.firewallTimeRemaining <= 0) {
            deactivateFirewall(player)
        }
    }

    // passieve lading, alleen opbouwen als de ult nog niet vol is
    if (player.ultCharge < MAX_CHARGE) {
        const chargeGain = PASSIVE_CHARGE_PER_SECOND * (delta / 1000)
        player.ultCharge = Math.min(MAX_CHARGE, player.ultCharge + chargeGain)
    }

    if (engine.input.keyboard.wasPressed(Keys.Digit0) || engine.input.keyboard.wasPressed(Keys.Num0)) {
        tryActivateUltimate(player)
    }
}

function tryActivateUltimate(player) {
    if (player.ultCharge < MAX_CHARGE) {
        // nog niet vol genoeg
        return false
    }

    activateFirewall(player)
    player.ultCharge = 0

    return true
}

function activateFirewall(player) {
    player.firewallActive = true
    player.firewallTimeRemaining = FIREWALL_DURATION
    // hier kan later een visueel effect of graphic toegevoegd worden, bv.
    // player.graphics.use(Resources.firewallEffect.toSprite())
}

function deactivateFirewall(player) {
    player.firewallActive = false
    player.firewallTimeRemaining = 0
}

// Aan te roepen door de attack/collision-resolution code wanneer player2
// een aanval met het juiste blocktype heeft geblokt (zie isCorrectBlock in 2-ability3.js)
export function onSuccessfulBlock(player) {
    player.ultCharge = Math.min(MAX_CHARGE, player.ultCharge + CHARGE_PER_CORRECT_BLOCK)
}

export function getUltChargePercent(player) {
    return player.ultCharge
}

export function isUltimateReady(player) {
    return player.ultCharge >= MAX_CHARGE
}

export function isFirewallActive(player) {
    return player.firewallActive === true
}
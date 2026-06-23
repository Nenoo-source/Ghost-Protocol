import { Sprite, Actor, Color, FadeInOut, Font, FontUnit, Keys, Label, Scene, Vector, DisplayMode, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from "../../resources"

const TransparentCooldown = 20000
let playerStatusTransparent
export function setupTransparent(player){
    player.transparentCooldownStat = 0
}

export function updateTransparent(player, engine, delta) {

    if (player.transparentCooldownStat > 0) {
        player.transparentCooldownStat -= delta
        if (player.transparentCooldownStat < 0) {
            player.transparentCooldownStat = 0
        }
    }

    if (engine.input.keyboard.wasPressed(Keys.Digit2) || engine.input.keyboard.wasPressed(Keys.Num2)) {
            tryTransparent(player, delta)
    
        }
    
}

function tryTransparent(player, delta){
    if (player.transparentCooldownStat > 0) {
        // nog niet beschikbaar
        return false
    }

    // set transparent sprite (if needed)
    player.graphics.use(Resources.player1.toSprite())

    // make semi-transparent
    player.graphics.opacity = 0.6
    playerStatusTransparent = true
    player.transparentCooldownStat = TransparentCooldown
    Resources.Invisibility.play()
    setTimeout(() => {
        player.graphics.opacity = 1
        playerStatusTransparent = false
    }, 10000)
    return true
}

export function isTransparentReady(player){
    return player.transparentCooldownStat <= 0
}
import { ImageSource, Sound, Resource, Loader } from 'excalibur'


// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png'),
    start: new ImageSource('images/start.png'),
    Tutorial: new ImageSource('images/tutorial.png'),
    player1: new ImageSource('images/attackPlayer.png'),
    tv: new ImageSource('images/tvenemy.png'),
    player2: new ImageSource('images/defensePlayer.png'),
    defensiveState: new ImageSource('images/defensive_player_blocking_state.png'),
    cookie: new ImageSource('images/cookies.png'),
    Coin: new ImageSource('images/Coin.png'),
    GameOver: new ImageSource('images/gameover.png'),
    cablemonster: new ImageSource('images/cablemonster.png'),
    revenantWalk: new ImageSource("images/cablewalk1.png"),
    tvWalk: new ImageSource("images/tvwalk.png"),
    BossBackground: new ImageSource("images/bossbackground.png"),
    Ghost: new ImageSource("images/ghost.png"),
    RainDrop: new ImageSource("images/raindrop.png"),
    Cursor: new ImageSource("images/cursor.png"),
    Victory: new ImageSource("images/victory.png"),
    Ezdiffmusic1: new Sound('sounds/Level1&simpledifficulty.mp3'),
    Middiffmusic1: new Sound('sounds/Mediumdifficulty1.mp3'),
    Highdiffmusic1: new Sound('sounds/Highdifficulty1.mp3'),
    Highdiffmusic2: new Sound('sounds/Highdifficulty2.mp3'),
    Menumusic: new Sound('sounds/Menumusic.mp3'),
    Lasergun1: new Sound('sounds/Lasergun1.mp3'),
    Lasergun2: new Sound('sounds/Lasergun2.m4a'),
    Gameover: new Sound('sounds/Gameover.mp3'),
    Shielddeflect: new Sound('sounds/Shielddeflect.mp3'),
    Teleport: new Sound('sounds/Teleport.mp3'),
    Ultshield: new Sound('sounds/Ultshield.mp3'),
    Levelcomplete: new Sound('sounds/LevelComplete.mp3'),
    Projectile: new ImageSource('images/projectile.png'),
    platform: new ImageSource('images/platform2.png'),
    Damagesound: new Sound('sounds/Damage.mp3'),
    Superjumpsound: new Sound('sounds/Highjump.mp3'),
    Scansound: new Sound('sounds/Scan.mp3'),
    Invisibility: new Sound('sounds/Invisibility.mp3'),
    Coincollect: new Sound('sounds/Coincollect.mp3'),
    SafetyOutline: new ImageSource('images/safetyBarOutline.png'),
    Laser: new ImageSource('images/Laser.png'),
    LaserOff: new ImageSource('images/LaserOff.png'),
    Button: new ImageSource('images/button.png'),
    BlockUI: new ImageSource('images/block_ui.png'),
    WarpUI: new ImageSource('images/warp.png'),
    superJumpUI: new ImageSource('images/superJump.png'),
    AttackUI: new ImageSource('images/attack_ui.png'),
    IncognitoUI: new ImageSource('images/incognito_ui.png'),
    GameOverMusic: new Sound('sounds/GameOverMusic.mp3'),
    ButtonPress: new Sound('sounds/ButtonPress.mp3'),
    Door: new ImageSource('images/endDoor.png'),
    //player1 animaties
    Run1: new ImageSource('images/attackingplayerRun1.png'),
    Run2: new ImageSource('images/attackingplayerRun2.png'),
    Run3: new ImageSource('images/attackingplayerRun3.png'),
    Jump1: new ImageSource('images/jump1.png'),
    Jump2: new ImageSource('images/jump2.png'),
    Jump3: new ImageSource('images/jump3.png'),
    Jump4: new ImageSource('images/jump4.png'),
    Aim1: new ImageSource('images/aim1.png'),
    Aim2: new ImageSource('images/aim2.png'),
    //player2 animaties
    Run4: new ImageSource('images/devensivePlayerRunning.png'),
    Run5: new ImageSource('images/defensePlayer.png'),
    Run6: new ImageSource('images/devensivePlayerRunning.png'),
    Jump5: new ImageSource('images/devensivePlayerSquat.png'),
    Jump6: new ImageSource('images/devensivePlayerJump.png'),
    runningDevensiveState1: new ImageSource('images/defensive_player_blocking_state.png'),
    runningDevensiveState2: new ImageSource('images/defensivePlayerRunningBlocking.png'),
}



const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

ResourceLoader.suppressPlayButton = true


export { Resources, ResourceLoader }
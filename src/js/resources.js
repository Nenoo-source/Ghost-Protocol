import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png'),
    start: new ImageSource('images/start.png'),
    player1: new ImageSource('images/attackPlayer.png'),
    tv: new ImageSource('images/tvenemy.png'),
    player2: new ImageSource('images/defensePlayer.png'),
    cookie: new ImageSource('images/cookie.png'),
    Ezdiffmusic1: new Sound('sounds/Level1&simpledifficulty.mp3'),
    Middiffmusic1: new Sound('sounds/Mediumdifficulty1.mp3'),
    Highdiffmusic1: new Sound('sounds/Highdifficulty1.mp3'),
    Highdiffmusic2: new Sound('sounds/Highdifficulty2.mp3'),
    Menumusic: new Sound('sounds/Menumusic.mp3'),
    Lasergun1: new Sound('sounds/Lasergun1.mp3'),
    Lasergun2: new Sound('sounds/Lasergun2.m4a'),
    Gameover: new Sound('sounds/Gameover.mp3'),
    Shielddeflect: new Sound('sounds/Shielddeflect.mp3'),
    Teleport: new Sound('sounds/Shielddeflect.mp3'),
    Ultshield: new Sound('sounds/Ultshield.mp3'),
    Levelcomplete: new Sound('sounds/Levelcomplete.mp3'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

ResourceLoader.suppressPlayButton = true


export { Resources, ResourceLoader }
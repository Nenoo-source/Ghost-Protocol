import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png'),
<<<<<<< HEAD
    player1: new ImageSource('images/fish.png'),
    tv: new ImageSource('images/tvenemy.png')
=======
    player1: new ImageSource('images/defensePlayer.png'),
    tv: new ImageSource('images/mine.png')
>>>>>>> f80c92b9fc68213970defd435855888b9203bc55
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

ResourceLoader.suppressPlayButton = true


export { Resources, ResourceLoader }
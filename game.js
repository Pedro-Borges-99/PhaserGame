
var config = {
    width: 800,
    height: 800,
    backgroundColor: 0xFFFFFF,
    scene: [SceneStart],
    pixelArt: true,
    // physics:{
    //     default:"arcade",
    //     arcade:{
    //         debug:false
    //     }
    // }
}
var gameSettings = {
    lineX:70,
    lineY:575,
    playerY:561,
    playerX:50,
    padding: 20,
    baseGroundY: 700,



    platformLeftX: 30,
    plataformHeight: 250,
    minPlatformLength: 30,
    maxPlatformLength: 80,
    playerSpeed: 200,
}

var game = new Phaser.Game(config)




class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }
    preload(){
        
        this.load.audio("audio_beam",["assets/audio/beam.mp3","assets/audio/beam.ogg"])
        this.load.bitmapFont("pixelFont", "assets/font/font.png","assets/font/font.xml")
        this.load.image("background","assets/images/background.png")
        this.load.image("ship","assets/images/ship.png")
        this.load.image("ship2","assets/images/ship2.png")
        this.load.image("ship3","assets/images/ship3.png")
        this.load.spritesheet("run","assets/spritesheets/run.png",{
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet("explosion","assets/spritesheets/explosion-4.png",{
            frameWidth: 128,
            frameHeight: 128
        })
        this.load.spritesheet("power-up","assets/spritesheets/power-up.png",{
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("jump","assets/spritesheets/jump.png",{
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet("idle","assets/spritesheets/idle.png",{
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet("idle","assets/spritesheets/idle.png",{
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet("beam","assets/spritesheets/beam.png",{
            frameWidth: 16,
            frameHeight: 16
        })



    }

    create(){
        this.anims.create({
            key:"beam_anim",
            frames:this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key:"idle_anim",
            frames:this.anims.generateFrameNumbers("idle"),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key:"up",
            frames:this.anims.generateFrameNumbers("jump",{
                start:0,
                end:1
            }),
            frameRate: 20,
            repeat: 0
        })
        this.anims.create({
            key:"max-jump",
            frames:this.anims.generateFrameNumbers("jump",{
                start:1,
                end:2
            }),
            frameRate: 20,
            repeat: 0
        })
        this.anims.create({
            key:"down",
            frames:this.anims.generateFrameNumbers("jump",{
                start:2,
                end:3
            }),
            frameRate: 20,
            repeat: 0
        })

        this.anims.create({
            key:"run_anim",
            frames:this.anims.generateFrameNumbers("run"),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key:"explosion_anim",
            frames:this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete:true
        })
        this.anims.create({
            key:"red",
            frames:this.anims.generateFrameNumbers("power-up",{
                start:0,
                end:1
            }),
            frameRate: 20,
            repeat: -1

        })
        this.anims.create({
            key:"gray",
            frames:this.anims.generateFrameNumbers("power-up",{
                start:2,
                end:3
            }),
            frameRate: 20,
            repeat: -1

        })
        
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame")
    }
}
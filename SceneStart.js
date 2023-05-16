class SceneStart extends Phaser.Scene {
    constructor() {
        super("start");
        
    }
    preload(){
        this.load.image("background","assets/images/background.png")
        
        this.load.spritesheet("run","assets/spritesheets/run.png",{
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet("jump","assets/spritesheets/jump.png",{
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet("idle","assets/spritesheets/idle.png",{
            frameWidth: 48,
            frameHeight: 48
        })
    }
    create(){
        
        this.gKeyReleased = false;
        this.lineWidth=4
        
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background")
        this.background.setOrigin(0, 0)
       
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
        
        
        //creating inputs
        this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.key_E=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.key_G=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
        //creating game objects~
        this.platforms = this.add.group();
        

        this.leftPlatform=new Phaser.GameObjects.Rectangle(this,gameSettings.platformLeftX+gameSettings.padding,gameSettings.baseGroundY,gameSettings.maxPlatformLength,gameSettings.plataformHeight,0x00FF00)
        this.rightPlatform=new Platfrom(this)
        //var leftLength=Phaser.Math.Between(gameSettings.minPlatformLength,gameSettings.maxPlatformLength)
        this.add.existing(this.leftPlatform)
        this.add.existing(this.rightPlatform)

        this.platforms.add(this.leftPlatform)
        this.platforms.add(this.rightPlatform)
        
        
        this.idle = this.add.sprite(gameSettings.playerX, gameSettings.playerY, "idle")
        this.idle.play("idle_anim")
       
        

        this.line=new Phaser.GameObjects.Rectangle(this, gameSettings.lineX,
            gameSettings.lineY , this.lineWidth, this.lineWidth ,0xff0000)
            this.add.existing(this.line)

    }
    //inner Funcitons
    movePlatforms(){
        for (var i = 0; i < this.platforms.getChildren().length; i++) {
           
            let plat = this.platforms.getChildren()[i];

            console.log(this.platforms.getChildren().length)
            console.log(this.rightPlatform.x > gameSettings.platformLeftX+gameSettings.padding)

            
            if(this.rightPlatform.x > gameSettings.platformLeftX+gameSettings.padding){
            plat.x-=20
            
            }else{
                this.leftPlatform.destroy()
                this.newPlatform()
            }


        }
    }
    newPlatform(){
        this.leftPlatform=this.rightPlatform
        //this.rightPlatform.destroy()
    
        this.rightPlatform=new Platfrom(this)
        this.add.existing(this.leftPlatform)
        this.add.existing(this.rightPlatform)
        this.platforms.add(this.rightPlatform)
    }
    createPlatform(){
        console.log(this.platforms.getChildren().length)
        this.platforms.clear(true,true)
        this.leftPlatform=new Phaser.GameObjects.Rectangle(this,gameSettings.platformLeftX+gameSettings.padding,gameSettings.baseGroundY,gameSettings.maxPlatformLength,gameSettings.plataformHeight,0x00FF00)
        this.rightPlatform=new Platfrom(this)
        //var leftLength=Phaser.Math.Between(gameSettings.minPlatformLength,gameSettings.maxPlatformLength)
        this.add.existing(this.leftPlatform)
        this.add.existing(this.rightPlatform)
        
        

        this.platforms.add(this.leftPlatform)
        this.platforms.add(this.rightPlatform)
    }
    growLine(){
        
            this.line.height-=2

        
    }
    isGameOver(){
        
        var isLineOut=(this.line.x+Math.abs(this.line.height)+2 < (this.rightPlatform.x-(this.rightPlatform.width/2))
        || this.line.x+Math.abs(this.line.height) +2> (this.rightPlatform.x + (this.rightPlatform.width/2)))
        return isLineOut
    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            
            this.line.destroy()
            this.line=new Phaser.GameObjects.Rectangle(this, gameSettings.lineX,
                gameSettings.lineY , this.lineWidth, this.lineWidth ,0xff0000)
                this.add.existing(this.line)
            this.createPlatform()
        }
        if (Phaser.Input.Keyboard.JustDown(this.key_E)) {
            
            
            
            this.movePlatforms()
            console.log((this.line.x+Math.abs(this.line.height))+","+(Math.abs(this.line.height))+","+(this.rightPlatform.x+(this.rightPlatform.width/2)))
        }
        if (this.key_G.isDown) {
            if (Phaser.Input.Keyboard.JustDown(this.key_G)) {
                
                this.gKeyReleased = true
            }
            console.log("g")

            this.growLine()
        }
        if (this.key_G.isUp && this.gKeyReleased) {     
            if(this.isGameOver()){
                alert("gameover")
            }
            this.line.setAngle([90])

            //this.lineDraw.angle = 30;
            this.gKeyReleased = false; // Reset the flag
          }
          
            
        
    

        
    }
}
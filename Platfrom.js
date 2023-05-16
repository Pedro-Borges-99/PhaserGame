class Platfrom extends Phaser.GameObjects.Rectangle{
    
    constructor(scene){
        var xRandom= Phaser.Math.Between(gameSettings.platformLeftX+gameSettings.maxPlatformLength + gameSettings.padding,config.width - gameSettings.maxPlatformLength);
        var length=Phaser.Math.Between(gameSettings.minPlatformLength,gameSettings.maxPlatformLength)
        //super(scene,x,config.height,"platform")
        
        super(scene,xRandom,gameSettings.baseGroundY,length,gameSettings.plataformHeight,0x000000)
        //this.scene=scene

        
        
        
        
    }
    
    // generateFirstScene(){
    //     var leftPlatform=new Phaser.GameObjects.Rectangle(this.scene,gameSettings.platformLeftX,config.height - gameSettings.plataformHeight,gameSettings.maxPlatformLength,gameSettings.plataformHeight,0x00FF00)
    //     //var leftX= Phaser.Math.Between(gameSettings.platformLeftX , gameSettings.platformLeftX+ gameSettings.maxPlatformLength+ gameSettings.padding);
    //     //var leftLength=Phaser.Math.Between(gameSettings.minPlatformLength,gameSettings.maxPlatformLength)
    //     this.scene.leftPlatform= this.scene.add.graphics({ fillStyle: { color: 0x00FF00 } }) 
    //     this.scene.leftPlatform.fillRectShape(leftPlatform)
    //     this.scene.platforms.add(this.scene.leftPlatform)

    //     this.scene.platform=this.scene.add.graphics({ fillStyle: { color: 0x000000 } })

    //     this.scene.platform.fillRectShape(this)
    //     this.scene.platforms.add(this.scene.platform)

    // }


}
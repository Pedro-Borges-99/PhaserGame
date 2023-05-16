class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x= scene.idle.x;
        var y = scene.idle.y;
        super(scene,x,y,"beam")
        scene.projectiles.add(this)
        scene.add.existing(this)
       this.play("beam_anim")
    scene.physics.world.enableBody(this)
    this.body.velocity.x = +250 
    }

    update(){
        if(this.x > config.width-20){
            this.destroy()
        }
    }
}
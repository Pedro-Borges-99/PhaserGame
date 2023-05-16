class Scene3 extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }
    preload(){
        this.load.image("gameover","assets/images/gameover.jpg")
    }
    create(){
        this.gameoverImg=this.add.image(0,0,"gameover")
        this.key_R=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.key_R)) {
            this.gameoverImg.destroy()
            this.scene.start("start")
        }
    }
}
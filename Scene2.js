class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    create() {
        this.platforms = this.add.group();
        




        //this.background=this.add.image(0,0,"background")
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background")
        this.background.setOrigin(0, 0)

        this.ship = this.add.image(config.width / 2 - 50, config.height / 2, "ship")
        this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2")
        this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "ship3")
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship)
        this.enemies.add(this.ship2)
        this.enemies.add(this.ship3)
        this.run = this.add.sprite(100, 100, "run")
        this.idle = this.physics.add.sprite(10, 200, "idle")
        this.idle.play("idle_anim")
        this.cursorKeys = this.input.keyboard.createCursorKeys()
        this.idle.setCollideWorldBounds(true);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)


        this.run.play("run_anim")
        this.run.setInteractive();
        this.input.on('gameobjectdown', this.destroyPlayer, this)
        this.beamSound = this.sound.add("audio_beam")

        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1)
        graphics.beginPath();
        graphics.moveTo(0, 0)
        graphics.lineTo(config.width, 0)
        graphics.lineTo(config.width, 20)
        graphics.lineTo(0, 20)
        graphics.lineTo(0, 0)
        graphics.closePath()
        graphics.fillPath()


        this.score = 0;


        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16)

        this.projectiles = this.add.group();

        this.powerUps = this.physics.add.group();
        var maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
            if (Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("gray")
            }
            powerUp.setVelocity(100, 100)
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);

        }
        this.canJump = true;
        this.baselineY = this.idle.y

        this.physics.add.collider(this.projectiles, this.powerUps, function (projectile, powerUp) {
            projectile.destroy()
        })
        this.physics.add.overlap(this.idle, this.powerUps, this.pickPowerUp, null, this)
        this.physics.add.overlap(this.idle, this.enemies, this.hurtRun, null, this)
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this)
    }
    zeroPad(number, size) {
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber
        }
        return stringNumber
    }
    hitEnemy(projectile, enemy) {
        var explosion = new Explosion(this, enemy.x, enemy.y)
        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 1;
        var scoreFormated = this.zeroPad(this.score, 6)
        this.scoreLabel.text = "SCORE " + scoreFormated;

    }
    resetPlayer(){
        var x= 100
        var y= config.height +64
        this.idle.enableBody(true,x,y,true,true)

        this.idle.alpha =0.5
        var tween=this.tweens.add({
            targets: this.idle,
            y: config.height-64,
            ease: 'Sine.easeInOut',
            duration: 1500,
            repeat:0,
            onComplete: function(){
                this.idle.alpha=1;
            },
            callbackScope: this
        })
    }
    hurtRun(idle, enemy) {
        this.resetShipPos(enemy)
        var explosion = new Explosion(this, idle.x, idle.y)
        idle.disableBody(true, true)
        //this.resetPlayer()
        this.time.addEvent({
            delay:1000,
            callback:this.resetPlayer,
            callbackScope: this,
            loop:false
        })


    }
    pickPowerUp(idle, powerUp) {
        powerUp.disableBody(true, true)

    }
    moveShip(ship, speed) {
        ship.y += speed
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }
    resetShipPos(ship) {
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, config.width)
        ship.x = randomX;
    }
    destroyPlayer(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explosion_anim")

    }
    jump() {
        this.idle.play("up")
    }

    shootBeam() {
        var beam = new Beam(this)
        this.beamSound
    }
    createPlatform(){
        var platform= new Platfrom(this)
        platform.generateFirstScene()
        
    }
    movePlatforms(){
        for (var i = 0; i < this.platforms.getChildren().length; i++) {
            let plat = this.platforms.getChildren()[i];
            console.log(plat)
            console.log(plat.x , gameSettings.platformLeftX)
            if(this.platforms.getChildren()[this.platforms.getChildren().length - 1].x < gameSettings.platformLeftX){
            plat.x-=10
            }
            console.log(typeof plat)
            if(plat.x < -gameSettings.maxPlatformLength){
                plat.destroy()

            }


        }


    }

    update() {
        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }


        this.moveShip(this.ship, 0.1)
        this.moveShip(this.ship2, 0.2)
        this.moveShip(this.ship3, 0.3)
        //this.background.tilePositionX += 0.5 //change this to repeat background movement in X axis
        this.movePlayerManager();
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.canJump) {
            this.createPlatform()
        }
        if (Phaser.Input.Keyboard.JustDown(this.key_E)) {
            if (this.idle.active) {
                this.shootBeam()
                this.movePlatforms()
            }
        }
    }
    movePlayerManager() {

        if (this.cursorKeys.up.isDown && this.canJump) {
            if (this.canJump) {
                this.idle.play("up")
                this.idle.setVelocityY(-200)
            }
        } else if (this.idle.y < 100) {
            this.canJump = false
            this.idle.play("max-jump")
            this.idle.setVelocityY(+200)

        } else if (this.idle.y > 100 && !this.canJump) {

            if (this.idle.y < 200) {
                this.idle.play("down")
                this.idle.setVelocityY(+200)
            } else {
                console.log("banana")
                this.canJump = true;
                this.idle.setTexture("idle")
                this.idle.play("idle_anim")
                this.idle.setVelocityY(0)
                this.idle.y = this.baselineY
            }


        }
    }

}

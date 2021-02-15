export class Player {
    constructor(physics, anims) {
        this.physics = physics
        this.anims = anims
    }
  
    create() {
        this.player = this.physics.add.sprite(640, 360, 'player');
        this.anims.create({
            key: 'playerIdle',
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 10 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNumbers('playerRunRight', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        })        
    }

    moveLeft() {
        this.player.setVelocityX(-200)
        this.player.scaleX = -1
        this.player.anims.play('playerRun', true)
    }

    moveRight() {
        this.player.setVelocityX(200)
        this.player.scaleX = Math.abs(this.player.scaleX)
        this.player.anims.play('playerRun', true)
    }

    stop() {
        this.player.setVelocityX(0)
        this.player.anims.play('playerIdle', true)
    }

  }
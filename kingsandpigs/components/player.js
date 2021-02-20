export class Player {
    constructor(physics, anims) {
        this.physics = physics
        this.anims = anims
    }

    create() {
        this.player = this.physics.add.sprite(640, 160, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true)
        this.anims.create({
            key: 'playerIdle',
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 10 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'playerAttack',
            frames: this.anims.generateFrameNumbers('playerAttack', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'playerJumpUp',
            frames: this.anims.generateFrameNumbers('playerJump', { start: 0, end: 0 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'playerJumpDown',
            frames: this.anims.generateFrameNumbers('playerFall', { start: 0, end: 0 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'playerGround',
            frames: this.anims.generateFrameNumbers('playerGround', { start: 0, end: 0 }),
            frameRate: 15,
            repeat: -1
        })
        
    }

    sprite() {
        return this.player
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

    attack() {
        this.player.anims.play('playerAttack', true)
    }

    jump() {
        if (this.player.body.onFloor()) {
            this.player.setVelocityY(-250)
        }
    }

    jumpUp() {
        this.player.anims.play('playerJumpUp', true)
    }

    jumpDown() {
        this.player.anims.play('playerJumpDown', true)
    }

    ground() {
        this.player.setVelocityX(0)
        this.player.anims.play('playerGround', true)
    }

  }
export class Player {
    constructor(physics, anims) {
        this.physics = physics
        this.anims = anims
    }

    create() {
        this.playerSprite = this.physics.add.sprite(100, 500, 'player');
        this.playerSprite.setBounce(0.2);
        this.playerSprite.setCollideWorldBounds(true)
        this.isDead = false
        this.hasWon = false
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
            frameRate: 1,
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
        this.anims.create({
            key: 'playerDead',
            frames: this.anims.generateFrameNumbers('playerDead', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        })        
        
    }

    sprite() {
        return this.playerSprite
    }

    moveLeft() {
        this.playerSprite.flipX = true
        this.playerSprite.setVelocityX(-200)
        this.playerSprite.anims.play('playerRun', true)
    }

    moveRight() {
        this.playerSprite.flipX = false
        this.playerSprite.setVelocityX(200)
        this.playerSprite.scaleX = Math.abs(this.playerSprite.scaleX)
        this.playerSprite.anims.play('playerRun', true)
    }

    stop() {
        this.playerSprite.setVelocityX(0)
        this.playerSprite.anims.play('playerIdle', true)
    }

    attack() {
        this.playerSprite.anims.play('playerAttack', true)
    }

    jump() {
        if (this.playerSprite.body.onFloor()) {
            this.playerSprite.setVelocityY(-350)
        }
    }

    jumpUp() {
        this.playerSprite.anims.play('playerJumpUp', true)
    }

    jumpDown() {
        this.playerSprite.anims.play('playerJumpDown', true)
    }

    ground() {
        this.playerSprite.setVelocityX(0)
        this.playerSprite.anims.play('playerGround', true)
    }

    dead() {
        this.playerSprite.setVelocityX(0)
        this.playerSprite.anims.play('playerDead', true)
        this.isDead = true
    }

    isDead() {
        return this.isDead
    }

    hasWon() {
        return this.hasWon
    }

  }
export class Player {

    constructor(physics, anims) {
        this.physics = physics
        this.anims = anims
    }

    create() {
        this.playerSprite = this.physics.add.sprite(400, 500, 'player')
        this.playerSprite.setScale(1.2)
        this.playerSprite.setBounce(0.1)
        this.playerSprite.setCollideWorldBounds(true)
        this.isAttacking = false
        // animations
        this.anims.create({
            key: 'playerWalk',
            frames: this.anims.generateFrameNumbers('playerWalk', { start: 1, end: 0 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'playerStop',
            frames: this.anims.generateFrameNumbers('playerStop', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'playerShot',
            frames: this.anims.generateFrameNumbers('playerShot', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'playerDuck',
            frames: this.anims.generateFrameNumbers('playerDuck', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        })
    }

    getSprite() {
        return this.playerSprite
    }

    moveLeft() {
        this.playerSprite.flipX = false
        this.playerSprite.setVelocityX(-60)
        this.playerSprite.anims.play('playerWalk', true)
    }

    moveRight() {
        this.playerSprite.flipX = true
        this.playerSprite.setVelocityX(60)
        this.playerSprite.scaleX = Math.abs(this.playerSprite.scaleX)
        this.playerSprite.anims.play('playerWalk', true)
    }

    stop() {
        this.playerSprite.setVelocityX(0)
        this.playerSprite.anims.play('playerStop', true)
    }

    shot() {
        this.playerSprite.anims.play('playerShot', true)
    }

    duck() {
        this.playerSprite.setVelocityX(0)
        this.playerSprite.anims.play('playerDuck', true)
    }
}
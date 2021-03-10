export class Player {

    constructor(physics, anims) {
        this.physics = physics
        this.anims = anims
    }

    create() {
        this.playerSprite = this.physics.add.sprite(400, 300, 'player')
        this.playerSprite.setBounce(0.2)
        this.playerSprite.setCollideWorldBounds(true)
        // animations
        this.anims.create({
            key: 'playerWalk',
            frames: this.anims.generateFrameNumbers('playerWalk', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })
    }

    getSprite() {
        return this.playerSprite
    }

    moveLeft() {
        this.playerSprite.flipX = false
        this.playerSprite.setVelocityX(-50)
        this.playerSprite.anims.play('playerWalk', true)
    }

    moveRight() {
        this.playerSprite.flipX = true
        this.playerSprite.setVelocityX(50)
        this.playerSprite.scaleX = Math.abs(this.playerSprite.scaleX)
        this.playerSprite.anims.play('playerWalk', true)
    }
}
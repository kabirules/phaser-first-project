export class Player {

    constructor(physics, anims) {
        this.physics = physics
        this.anims = anims
    }

    create() {
        this.playerSprite = this.physics.add.sprite(400, 500, 'player')
        this.playerSprite.setScale(1.8)
        this.playerSprite.setBounce(0.1)
        this.playerSprite.setCollideWorldBounds(true)
        this.isAttacking = false
        this.speed = 100
        // animations
        this.anims.create({
            key: 'playerWalkSouth',
            frames: this.anims.generateFrameNumbers('playerWalkSouth', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'playerWalkNorth',
            frames: this.anims.generateFrameNumbers('playerWalkNorth', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'playerWalkWest',
            frames: this.anims.generateFrameNumbers('playerWalkWest', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'playerWalkEast',
            frames: this.anims.generateFrameNumbers('playerWalkEast', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'playerStop',
            frames: this.anims.generateFrameNumbers('playerWalkSouth', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        })
    }

    getSprite() {
        return this.playerSprite
    }

    walkSouth() {
        this.playerSprite.setVelocityY(this.speed)
        this.playerSprite.anims.play('playerWalkSouth', true)
        this.playerSprite.setVelocityX(0)
    }
    walkNorth() {
        this.playerSprite.setVelocityY(-this.speed)
        this.playerSprite.anims.play('playerWalkNorth', true)
        this.playerSprite.setVelocityX(0)
    }
    walkWest() {
        this.playerSprite.setVelocityX(-this.speed)
        this.playerSprite.anims.play('playerWalkWest', true)
        this.playerSprite.setVelocityY(0)
    }
    walkEast() {
        this.playerSprite.setVelocityX(this.speed)
        this.playerSprite.anims.play('playerWalkEast', true)
        this.playerSprite.setVelocityY(0)
    }
    stop() {
        this.playerSprite.anims.play('playerStop', true)
        this.playerSprite.setVelocityX(0)
        this.playerSprite.setVelocityY(0)
    }
}
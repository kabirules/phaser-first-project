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
            key: 'playerWalkSouth',
            frames: this.anims.generateFrameNumbers('playerWalkSouth', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'playerWalkNorth',
            frames: this.anims.generateFrameNumbers('playerWalkNorth', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'playerWalkWest',
            frames: this.anims.generateFrameNumbers('playerWalkWest', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'playerWalkEast',
            frames: this.anims.generateFrameNumbers('playerWalkEast', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        })
    }

    getSprite() {
        return this.playerSprite
    }

    walkSouth() {
        this.playerSprite.flipX = false
        this.playerSprite.setVelocityY(60)
        this.playerSprite.anims.play('playerWalkSouth', true)
    }
    walkNorth() {
        this.playerSprite.flipX = false
        this.playerSprite.setVelocityY(-60)
        this.playerSprite.anims.play('playerWalkNorth', true)
    }
    walkWest() {
        this.playerSprite.flipX = false
        this.playerSprite.setVelocityX(-60)
        this.playerSprite.anims.play('playerWalkWest', true)
    }
    walkEast() {
        this.playerSprite.flipX = false
        this.playerSprite.setVelocityX(60)
        this.playerSprite.anims.play('playerWalkEast', true)
    }
    stop() {
        this.playerSprite.setVelocityX(0)
        this.playerSprite.setVelocityY(0)
    }
}
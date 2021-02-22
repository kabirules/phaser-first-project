export class KingPig {
    constructor(physics, anims) {
        this.physics = physics
        this.anims = anims
    }

    create() {
        this.playerSprite = this.physics.add.sprite(840, 160, 'kingPig');
        this.playerSprite.setBounce(0.2);
        this.playerSprite.setCollideWorldBounds(true)
        this.anims.create({
            key: 'kingPigIdle',
            frames: this.anims.generateFrameNumbers('kingPigIdle', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: -1
        })
    }

    sprite() {
        return this.playerSprite
    }

    stop() {
        this.playerSprite.setVelocityX(0)
        this.playerSprite.anims.play('kingPigIdle', true)
    }
  }
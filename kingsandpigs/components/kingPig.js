export class KingPig {
    constructor(physics, anims) {
        this.physics = physics
        this.anims = anims
    }

    create() {
        this.kingPigSprite = this.physics.add.sprite(840, 160, 'kingPig');
        this.kingPigSprite.setBounce(0.2);
        this.kingPigSprite.setCollideWorldBounds(true)
        this.anims.create({
            key: 'kingPigIdle',
            frames: this.anims.generateFrameNumbers('kingPigIdle', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'kingPigHit',
            frames: this.anims.generateFrameNumbers('kingPigHit', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: -1
        })        
    }

    sprite() {
        return this.kingPigSprite
    }

    hit() {
        this.kingPigSprite.setVelocityX(0)
        this.kingPigSprite.anims.play('kingPigHit', true)
    }

    stop() {
        this.kingPigSprite.setVelocityX(0)
        this.kingPigSprite.anims.play('kingPigIdle', true)
    }
  }
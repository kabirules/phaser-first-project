export class KingPig {
    constructor(x, y, physics, anims) {
        this.physics = physics
        this.anims = anims
        this.x = x
        this.y = y
    }

    create() {
        this.kingPigSprite = this.physics.add.sprite(this.x, this.y, 'kingPig');
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
        this.anims.create({
            key: 'kingPigRun',
            frames: this.anims.generateFrameNumbers('kingPigRun', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'kingPigDead',
            frames: this.anims.generateFrameNumbers('kingPigDead', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        })

        this.kingPigSprite.on("animationcomplete", (animation)=>{
            if (animation.key === 'kingPigDead') {
                this.kingPigSprite.active = false
            }
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

    runLeft() {
        this.kingPigSprite.flipX = false
        this.kingPigSprite.setVelocityX(-50)
        this.kingPigSprite.anims.play('kingPigRun', true)
    }

    runRight() {
        this.kingPigSprite.flipX = true
        this.kingPigSprite.setVelocityX(50)
        this.kingPigSprite.anims.play('kingPigRun', true)
    }
  }
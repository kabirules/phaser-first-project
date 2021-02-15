export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }

    init() {
    }

    preload() {
        this.load.spritesheet('player', 
            'assets/01-King Human/Idle (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );
    }

    create() {
        this.player = this.physics.add.sprite(640, 360, 'player');
        this.anims.create({
            key: 'player-idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
            frameRate: 15,
            repeat: -1
        })
        this.player.anims.play('player-idle', true);

    }

    update() {
    }
}
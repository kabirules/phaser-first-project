import { Player } from '../components/player.js';

export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }

    init() {
    }

    preload() {
        this.load.spritesheet('playerIdle', 
            'assets/01-King Human/Idle (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );
        this.load.spritesheet('playerRunRight', 
            'assets/01-King Human/Run (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );        
    }

    create() {
        // PLAYER
        this.player = new Player(this.physics, this.anims)
        this.player.create()
        this.player.stop()

        // INPUT
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        // PLAYER MOVEMENT
        if (this.cursors.left.isDown) {
            this.player.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.player.moveRight()
        } else {
            this.player.stop()
        }
        if (this.keySpace.isDown) {
            console.log('attack!')
        }
    }
}
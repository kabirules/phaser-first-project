import Phaser from 'phaser'
import { Player } from '../components/Player.js';

export default class Game extends Phaser.Scene
{
	constructor() {
		super({ key: 'game' });
	}

    init() {
        this.playerAttackTime = -999
    }

	preload() {
        // player spritesheets
        this.load.spritesheet('playerWalk', 
            'assets/playerWalk.png',
            { frameWidth: 12, frameHeight: 24, spacing: 12}
        );
        this.load.spritesheet('playerStop', 
            'assets/playerWalk.png',
            { frameWidth: 12, frameHeight: 24, spacing: 12}
        );
        this.load.spritesheet('playerShot', 
            'assets/playerShot.png',
            { frameWidth: 34, frameHeight: 24}
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

    update(time) {
        // player movement
        if (this.cursors.left.isDown) {
            this.player.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.player.moveRight()
        } else {
            this.player.stop()
        }
        if (this.keySpace.isDown && time - this.playerAttackTime > 300) {
            this.player.shot()
            this.playerAttackTime = time
        }
    }
}
import Phaser from 'phaser'
import { Player } from '../components/Player.js';

export default class Game extends Phaser.Scene
{
	constructor() {
		super({ key: 'game' });
	}

    init() {

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
        //this.load.image('player', 'playerWalk.png')
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
        // player movement
        if (this.cursors.left.isDown) {
            this.player.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.player.moveRight()
        } else {
            this.player.stop()
        }
        //this.add.image(400, 300, 'player');
    }
}
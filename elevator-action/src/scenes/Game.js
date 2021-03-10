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
        /*
        this.load.spritesheet('playerWalk', 
            'assets/playerWalk.png',
            { frameWidth: 12, frameHeight: 24, spacing: 12}
        );
        */
        this.load.image('player', 'assets/playerWalk.png')
        this.load.image('fall', 'assets/Fall.png')
    }

    create() {
        this.add.image(400, 300, 'fall')
        // PLAYER
        /*
        this.player = new Player(this.physics, this.anims)
        this.player.create()
        this.player.moveLeft()
        */
    }

    update() {

    }
}
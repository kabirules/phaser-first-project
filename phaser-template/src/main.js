import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene.js'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [HelloWorldScene]
}

export default new Phaser.Game(config)
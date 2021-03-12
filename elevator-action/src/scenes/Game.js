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
        this.load.spritesheet('playerDuck', 
            'assets/playerDuck.png',
            { frameWidth: 11, frameHeight: 24}
        );
        this.load.image('bullet', 'assets/bullet.png');
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
        if (this.cursors.down.isDown) {
            this.player.duck()
        }           
        if (this.keySpace.isDown && time - this.playerAttackTime > 500) {
            this.player.isAttacking = true
            this.player.shot()
            this.playerAttackTime = time
            let bulletOffset = this.player.getSprite().flipX?26:-15
            let bulletVelocity = this.player.getSprite().flipX?200:-200
            this.bullet = this.physics.add.sprite(this.player.getSprite().body.x+bulletOffset, this.player.getSprite().body.y+9, 'bullet')
            this.bullet.setVelocityX(bulletVelocity)
            this.bullet.body.allowGravity = false
        }
        // make the shooting animation last 150ms
        if (time - this.playerAttackTime > 150) {
            this.player.isAttacking = false
        } else {
            this.player.shot()
        }
    }
}
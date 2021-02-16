import { Player } from '../components/player.js';

export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }

    init() {
        this.playerAttackTime = -999
    }

    preload() {
        this.load.spritesheet('playerIdle', 
            'assets/01-King Human/Idle (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );
        this.load.spritesheet('playerRun', 
            'assets/01-King Human/Run (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );
        this.load.spritesheet('playerAttack', 
            'assets/01-King Human/Attack (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );
        this.load.spritesheet('playerJump', 
            'assets/01-King Human/Jump (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );
        this.load.spritesheet('playerFall', 
            'assets/01-King Human/Fall (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );
        this.load.image('atlas', 'assets/14-TileSets/Terrain (32x32).png');
    }

    create() {
        // PLAYER
        this.player = new Player(this.physics, this.anims)
        this.player.create()
        this.player.stop()

        // INPUT
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // FLOOR
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600, 400, 'atlas');
        //this.floor = this.physics.add.sprite(385, 430, 'atlas');
        //this.floor.setCollideWorldBounds(true)
        this.physics.add.collider(this.player.sprite(), this.platforms);
    }

    update(time) {
        // PLAYER MOVEMENT
        var playerSprite = this.player.sprite()
        if (this.cursors.left.isDown) {
            this.player.moveLeft()
        } else if (this.cursors.right.isDown) {
            this.player.moveRight()
        } else {
            this.player.stop()
        }
        if (this.keySpace.isDown && time - this.playerAttackTime > 500) {
            this.player.attack()
            this.playerAttackTime = time
        }
        if (this.cursors.up.isDown) {
            this.player.jump()
        }
        if (!playerSprite.body.touching.down) {
            if (playerSprite.body.velocity.y < 0) {
                this.player.jumpUp()
            } else {
                this.player.jumpDown()
            }
        }
    }
}
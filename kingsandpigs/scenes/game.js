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
        this.load.spritesheet('playerGround', 
            'assets/01-King Human/Ground (78x58).png',
            { frameWidth: 78, frameHeight: 58 }
        );
        this.load.image('terrain', 'assets/14-TileSets/Terrain (32x32).png');
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
        this.level = [
            [  0,  1,  2,  3,  4,  5,  6,  7,  8 ]
        ]
        this.map = this.make.tilemap({ data: this.level, tileWidth: 128, tileHeight: 128 });
        this.tiles = this.map.addTilesetImage("terrain");
        this.layer = this.map.createStaticLayer(0, this.tiles, 10, 500);
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
        if (this.cursors.down.isDown) {
            this.player.ground()
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
import { Player } from '../components/player.js';
import { KingPig } from '../components/kingPig.js';

export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }

    init() {
        this.playerAttackTime = -999
    }

    preload() {
        // player spritesheets
        this.load.spritesheet('playerIdle', 
            'assets/01-King Human/Idle.png',
            { frameWidth: 37, frameHeight: 32, spacing: 41}
        );
        this.load.spritesheet('playerRun', 
            'assets/01-King Human/Run.png',
            { frameWidth: 37, frameHeight: 32, spacing: 41}
        );
        this.load.spritesheet('playerAttack', 
            'assets/01-King Human/Attack.png',
            { frameWidth: 95, frameHeight: 58 }
        );
        this.load.spritesheet('playerJump', 
            'assets/01-King Human/Jump.png',
            { frameWidth: 37, frameHeight: 32 }
        );
        this.load.spritesheet('playerFall', 
            'assets/01-King Human/Fall.png',
            { frameWidth: 37, frameHeight: 32 }
        );
        this.load.spritesheet('playerGround', 
            'assets/01-King Human/Ground.png',
            { frameWidth: 37, frameHeight: 32 }
        );
        // king pig spritesheets
        this.load.spritesheet('kingPigIdle', 
            'assets/02-King Pig/Idle (38x28).png',
            { frameWidth: 18, frameHeight: 32, spacing: 20}
        );
        // level
        this.load.image('terrain', 'assets/14-TileSets/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/level2.json');
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#cccccc");
        // FLOOR
        this.map = this.make.tilemap({ key: "map", tileWidth: 64, tileHeight: 64 });
        this.tileset = this.map.addTilesetImage("tileset", "terrain");
        this.backgroundLayer = this.map.createStaticLayer('Tile Layer 1', this.tileset, 0, 0);
        this.layer = this.map.createStaticLayer('platforms', this.tileset, 0, 0);
        this.layer.setCollisionByExclusion([-1]);
       
        // PLAYER
        this.player = new Player(this.physics, this.anims)
        this.player.create()
        this.player.stop()

        // KING PIG
        this.kingPig = new KingPig(this.physics, this.anims)
        this.kingPig.create()
        this.kingPig.stop()

        // INPUT
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // COLLISIONS
        this.physics.add.collider(this.player.sprite(), this.layer);
        this.physics.add.collider(this.kingPig.sprite(), this.layer);
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
        if (this.cursors.up.isDown) {
            this.player.jump()
        }
        if (this.cursors.down.isDown) {
            this.player.ground()
        }   
        if (!playerSprite.body.onFloor()) {
            if (playerSprite.body.velocity.y < 0) {
                this.player.jumpUp()
            } else {
                this.player.jumpDown()
            }
        }
        if (this.keySpace.isDown && time - this.playerAttackTime > 500) {
            this.player.attack()
            this.playerAttackTime = time
        }        
    }
}
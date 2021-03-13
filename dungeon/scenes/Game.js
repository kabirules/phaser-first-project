import { Player } from '../components/Player.js';

export class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game' });
	}

    init() {
    }

	preload() {
        // player spritesheets
        this.load.spritesheet('playerWalkSouth', 
            'assets/playerWalkSouth.png',
            { frameWidth: 32, frameHeight: 31, spacing: 0, margin: 0}
        );
        this.load.spritesheet('playerWalkNorth', 
            'assets/playerWalkNorth.png',
            { frameWidth: 32, frameHeight: 31, spacing: 0, margin: 0}
        );
        this.load.spritesheet('playerWalkWest', 
            'assets/playerWalkWest.png',
            { frameWidth: 32, frameHeight: 31, spacing: 0, margin: 0}
        );
        this.load.spritesheet('playerWalkEast', 
            'assets/playerWalkEast.png',
            { frameWidth: 32, frameHeight: 31, spacing: 0, margin: 0}
        );
        // level
        this.load.image('floorTileset', 'assets/tilesets/floor.png');
        this.load.image('wallsTileset', 'assets/tilesets/walls.png');
        this.load.tilemapTiledJSON('map', 'assets/tilesets/dungeon1.json');
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#777777");
        // level
        this.map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
        this.tilesetFloor = this.map.addTilesetImage("floor", "floorTileset");
        this.floor = this.map.createLayer('floor', this.tilesetFloor, 0, 0);
                
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
        if (this.cursors.down.isDown) {
            this.player.walkSouth()
        } else if (this.cursors.up.isDown) {
            this.player.walkNorth()
        } else if (this.cursors.left.isDown) {
            this.player.walkWest()
        } else if (this.cursors.right.isDown) {
            this.player.walkEast()
        } else {
            this.player.stop()
        }
    }
}
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
        this.load.spritesheet('playerDead', 
            'assets/01-King Human/Dead.png',
            { frameWidth: 38, frameHeight: 32, spacing: 5 }
        );
        // king pig spritesheets
        this.load.spritesheet('kingPigIdle', 
            'assets/02-King Pig/Idle (38x28).png',
            { frameWidth: 18, frameHeight: 32, spacing: 20}
        );
        this.load.spritesheet('kingPigHit', 
            'assets/02-King Pig/Hit (38x28).png',
            { frameWidth: 18, frameHeight: 32, spacing: 19}
        );
        this.load.spritesheet('kingPigRun', 
            'assets/02-King Pig/Run (38x28).png',
            { frameWidth: 19, frameHeight: 32, spacing: 1}
        );
        this.load.spritesheet('kingPigDead', 
            'assets/02-King Pig/Dead.png',
            { frameWidth: 22, frameHeight: 28, spacing: 5}
        );        
        // level
        this.load.image('terrain', 'assets/14-TileSets/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/level2.json');
        this.load.image('exit', 'assets/14-TileSets/exit.png');
        //
        this.enemyPatrolTimer = 0
        this.enemyPatrolTime = 3000
        this.playerDeadTime = 0
        this.playerWonTime = 0
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#333333");
        // FLOOR
        this.map = this.make.tilemap({ key: "map", tileWidth: 64, tileHeight: 64 });
        this.tileset = this.map.addTilesetImage("tileset", "terrain");
        this.bounds = this.map.createStaticLayer('bounds', this.tileset, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('background', this.tileset, 0, 0);
        this.layer = this.map.createStaticLayer('platforms', this.tileset, 0, 0);
        this.bounds.setCollisionByExclusion([-1])
        this.layer.setCollisionByExclusion([-1]);
       
        // PLAYER
        this.player = new Player(this.physics, this.anims)
        this.player.create()
        this.player.stop()

        // KING PIG
        this.kingPig = new KingPig(900, 160, this.physics, this.anims)
        this.kingPig.create()
        this.kingPig.runLeft()
        this.kingPig1 = new KingPig(1050, 80, this.physics, this.anims)
        this.kingPig1.create()
        this.kingPig1.runLeft()
        this.kingPig2 = new KingPig(400, 80, this.physics, this.anims)
        this.kingPig2.create()
        this.kingPig2.runLeft()
        this.kingPig3 = new KingPig(300, 500, this.physics, this.anims)
        this.kingPig3.create()
        this.kingPig3.runLeft()

        //EXIT
        this.exit = this.physics.add.sprite(1142, 78, 'exit')
        this.exit.body.moves = false
        this.exit.body.collideWorldBounds = false;

        // INPUT
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // COLLISIONS
        this.physics.add.collider(this.player.sprite(), this.layer);
        this.physics.add.collider(this.kingPig.sprite(), this.layer);
        this.physics.add.collider(this.kingPig.sprite(), this.bounds);
        this.physics.add.collider(this.kingPig1.sprite(), this.layer);
        this.physics.add.collider(this.kingPig1.sprite(), this.bounds);
        this.physics.add.collider(this.kingPig2.sprite(), this.layer);
        this.physics.add.collider(this.kingPig2.sprite(), this.bounds);
        this.physics.add.collider(this.kingPig3.sprite(), this.layer);
        this.physics.add.collider(this.kingPig3.sprite(), this.bounds);
        this.physics.add.collider(this.player.sprite(), this.bounds);
        this.physics.add.overlap(this.player.sprite(), this.exit, this.playerExited, null, this);
        this.physics.add.overlap(this.player.sprite(), this.kingPig.sprite(),  this.enemyHit, null, this);
        this.physics.add.overlap(this.player.sprite(), this.kingPig1.sprite(),  this.enemyHit, null, this);
        this.physics.add.overlap(this.player.sprite(), this.kingPig2.sprite(),  this.enemyHit, null, this);
        this.physics.add.overlap(this.player.sprite(), this.kingPig3.sprite(),  this.enemyHit, null, this);

        //TEXT
        this.text = this.add.text(420, 200, '', { fontSize: '64px', fill: '#000' });
    }

    update(time, delta) {
        this.time = time
        // PLAYER MOVEMENT
        if (!this.player.isDead) {
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
                this.player.isAttacking = true
                this.player.attack()
                this.playerAttackTime = time
            }
            if (time - this.playerAttackTime > 500) {
                this.player.isAttacking = false
                this.player.sprite().body.width = 32
            } else {
                this.player.sprite().body.width = 55
            }
        }
        //ENEMY PATROL
        this.enemyPatrolTimer += delta
        if (this.enemyPatrolTimer > this.enemyPatrolTime) {
            if (this.kingPig.sprite().active) {
                if (this.kingPig.sprite().body.velocity.x < 0) {
                    this.kingPig.runRight()
                } else {
                    this.kingPig.runLeft()
                }
            }
            if (this.kingPig1.sprite().active) {
                if (this.kingPig1.sprite().body.velocity.x < 0) {
                    this.kingPig1.runRight()
                } else {
                    this.kingPig1.runLeft()
                }
            }
            if (this.kingPig2.sprite().active) {
                if (this.kingPig2.sprite().body.velocity.x < 0) {
                    this.kingPig2.runRight()
                } else {
                    this.kingPig2.runLeft()
                }
            }
            if (this.kingPig3.sprite().active) {
                if (this.kingPig3.sprite().body.velocity.x < 0) {
                    this.kingPig3.runRight()
                } else {
                    this.kingPig3.runLeft()
                }
            }                                    
            this.enemyPatrolTimer = this.enemyPatrolTimer - this.enemyPatrolTime
        }
        //RESTART GAME
        if (this.player.isDead) {
            this.text.setText("YOU DIED!")
            if (time - this.playerDeadTime > 2000) {
                this.scene.restart()
            }
        }
        if (this.player.hasWon) {
            this.text.setText("YOU WON!")
            if (time - this.playerWonTime > 2000) {
                this.scene.restart()
            }
        }        
    }

    enemyHit(player, kingPig) {
        // first check if player is attacking
        if (this.player.isAttacking && kingPig.active && 
            (player.x < kingPig.x && !player.flipX) || (player.x > kingPig.x && player.flipX)) {
            kingPig.anims.play('kingPigDead', true)
            kingPig.setVelocityX(0)
            return
        }
        if (Math.abs(player.x - kingPig.x) < 20
            &&
            Math.abs(player.y - kingPig.y) < 20
            &&
            kingPig.active) {
                if (!this.player.isDead) {
                    this.player.dead()
                    this.playerDeadTime = this.time
                }
        }
    }

    playerExited() {
        if (!this.player.hasWon) {
            this.player.hasWon = true
            this.playerWonTime = this.time
        }
    }

}
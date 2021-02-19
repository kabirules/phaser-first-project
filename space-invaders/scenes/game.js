export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.enemySpeedX = 80
        this.enemySpeedY = 10
        this.isBulletAlive = false
        this.isEnemyBulletAlive = false
        this.shootTime = -999
        this.enemyShootTime = -999
        this.score = 0
        this.hiScore = 0
        this.scoreText
        this.hiScoreText
        this.gameOverText
        this.waveText
        this.livesText
        this.canPlayerMove = true
        this.lives = 3
        this.wave = 1
        this.restartDelay=0
        this.currentTime
        this.allEnemies
        this.isPlayerExplosion = true
        this.isEnemyOnFloor = false
        this.isEnemyStopped = false
        this.isMobile = true//this.detectPlatform()
    }

    preload ()
    {
        //images
        this.load.image('player', './assets/player.png');
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('enemyBullet', './assets/enemyBullet.png');
        this.load.image('explosion', './assets/explosion.png');
        this.load.image('enemyExplosion', './assets/enemyExplosion.png');
        this.load.spritesheet('invader1ss', 
            './assets/invader1ss.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('invader2ss', 
            './assets/invader2ss.png',
            { frameWidth: 44, frameHeight: 32 }
        );
        this.load.spritesheet('invader3ss', 
            './assets/invader3ss.png',
            { frameWidth: 48, frameHeight: 32 }
        );
        // sounds
        this.load.audio('enemyExplosion', './assets/sounds/enemyExplosion.wav')
        this.load.audio('playerExplosion', './assets/sounds/playerExplosion.wav')
        this.load.audio('shot', './assets/sounds/shot.wav')
        // fonts
        this.loadFont("someFont", "./assets/fonts/someFont.ttf");
    }
    
    create ()
    {
        // PLAYER
        this.player = this.physics.add.sprite(300, 550, 'player')
        this.player.setCollideWorldBounds(true)
        this.isPlayerExplosion = true
        // ENEMIES
        this.createEnemies()
        this.startEnemiesMovement()
        this.animateEnemies()
                                        
        // INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pointer = this.input.activePointer;

        // SCORE
        this.hiScore = localStorage.getItem('hiScore')!=undefined?localStorage.getItem('hiScore'):0;
        this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontFamily: 'someFont', fontSize: '24px', fill: '#fff' });
        this.hiScoreText = this.add.text(280, 16, this.hiScore, { fontFamily: 'someFont', fontSize: '24px', fill: '#fff' });
        // WAVE
        this.waveText = this.add.text(380, 16, 'WAVE ' + this.wave, { fontFamily: 'someFont', fontSize: '24px', fill: '#fff' });
        // GAME OVER
        this.gameOverText = this.add.text(200, 200, '', { fontFamily: 'someFont', fontSize: '48px', fill: '#fff' });
        // LIVES
        this.livesText = this.add.text(480, 16, 'LIVES ' + this.lives, { fontFamily: 'someFont', fontSize: '24px', fill: '#fff' });
    }

    update (time)
    {
        this.currentTime = time
        // PLAYER MOVEMENT
        if (this.canPlayerMove) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-200)
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(200)
            } else {
                this.player.setVelocityX(0)
            }
            if (this.keySpace.isDown && (!this.isBulletAlive || time - this.shootTime > 1000)) {
                this.playerShoot(time)
            }
        } else { // OR RESTART THE GAME - DISABLED FOR 3 seconds
            if (this.keySpace.isDown &&  time - this.restartDelay > 3000) {
                this.startGame(80,10)
                this.scene.restart()
            }
        }
        if (this.isMobile) {
            if (this.pointer.isDown && this.canPlayerMove) {
                if (this.pointer.x > 300) {
                    this.player.setVelocityX(200)
                } else {
                    this.player.setVelocityX(-200)
                }
            } else {
                this.player.setVelocityX(0)
            }
            // auto shooting
            if (!this.isBulletAlive || time - this.shootTime > 1000) {
                this.playerShoot(time)
            }            
        }
        // ENEMIES MOVEMENT
        this.moveEnemies()

        // ENEMIES ATTACK
        var shootingEnemy = this.allEnemies.getChildren()[Phaser.Math.Between(0, 34)]
        if (shootingEnemy.active && (!this.isEnemyBulletAlive || time - this.enemyShootTime > 2000)) {
            var enemyBullet = this.physics.add.sprite(shootingEnemy.x, shootingEnemy.y, 'enemyBullet');
            enemyBullet.setVelocityY(200)
            this.enemyShootTime = time
            this.physics.add.collider(enemyBullet, this.player, this.playerHitByEnemyBullet, null, this);
            this.isEnemyBulletAlive = true
        }

        // ALL ENEMIES DEAD?
        if (this.allEnemies.countActive(true) === 0) {
            this.wave = this.wave + 1
            this.waveText.setText('WAVE ' + this.wave)
            this.startGame(this.enemySpeedX + this.wave*10, this.enemySpeedY + this.wave)
            this.allEnemies.clear(true)
            this.createEnemies()
            this.startEnemiesMovement()
            this.animateEnemies()
        }

        // ENEMIES REACHED FLOOR?
        var isEnemyOnFloor = false
        this.allEnemies.children.iterate(function (child) {
            if (child.y > 550) {
                isEnemyOnFloor = true
            }
        })
        if (isEnemyOnFloor) {
            this.stopGame()
            if (this.isPlayerExplosion) {
                this.sound.play('playerExplosion')
                this.isPlayerExplosion = false
            }
        }

    }

    playerShoot(time) {
        this.sound.play('shot')
        var bullet = this.physics.add.sprite(this.player.x, this.player.y-16, 'bullet')
        bullet.setVelocityY(-500)
        this.shootTime = time
        this.physics.add.collider(bullet, this.allEnemies, this.enemyHit, null, this)
        this.isBulletAlive = true    
    }

    enemyHit(bullet, enemy) {
        this.sound.play('enemyExplosion')
        bullet.disableBody(true, true);
        enemy.disableBody(true, true);
        this.isBulletAlive = false
        var enemyExplosion = this.add.image(bullet.x, bullet.y-20, 'enemyExplosion');
        this.tweens.add({targets: enemyExplosion, alpha: 0, duration: 200, ease: 'Power2'}, this);
        if (this.invaders1.children.contains(enemy)) {
            this.score += 40;
        }
        if (this.invaders2.children.contains(enemy) || this.invaders3.children.contains(enemy)) {
            this.score += 20;
        }
        if (this.invaders4.children.contains(enemy) || this.invaders5.children.contains(enemy)) {
            this.score += 10;
        }            
        this.scoreText.setText('SCORE: ' + this.score);
        if (this.score > this.hiScore) {
            this.hiScore = this.score
            this.hiScoreText.setText(this.hiScore);
            localStorage.setItem('hiScore', this.score);
        }
    }

    playerHitByEnemyBullet(enemyBullet, player) {
        this.sound.play('playerExplosion')
        player.setVelocityY(0)
        enemyBullet.disableBody(true, true);
        this.tweens.add({targets: player, alpha: 0, duration: 1, ease: 'Power2'}, this);
        var explosion = this.add.image(player.x, player.y, 'explosion');
        this.tweens.add({targets: explosion, alpha: 0, duration: 2000, ease: 'Power2'}, this);
        player.x = 300
        player.y = 550
        this.tweens.add({targets: player, alpha: 1, duration: 2000, ease: 'Power2'}, this);
        this.lives--
        this.livesText.setText('LIVES ' + this.lives)
        if (this.lives === 0) {
            this.stopGame()
        }
    }

    // GAME OVER!
    playerHitByEnemy(enemy, player) {
        if (this.isPlayerExplosion) {
            this.sound.play('playerExplosion')
            this.isPlayerExplosion = false
        }
        this.tweens.add({targets: player, alpha: 0, duration: 1, ease: 'Power2'}, this);
        var explosion = this.add.image(player.x, player.y, 'explosion');
        this.tweens.add({targets: explosion, alpha: 0, duration: 2000, ease: 'Power2'}, this);
        this.stopGame()
    }

    // ONLY CALLED ON GAME OVER
    stopGame() {
        this.gameOverText.setText('GAME OVER')
        this.allEnemies.setVelocityX(0)
        this.allEnemies.setVelocityY(0)
        this.isEnemyStopped = true
        this.player.setVelocityX(0)
        this.score = 0
        this.shootTime = 999999999
        this.enemyShootTime = 999999999
        this.canPlayerMove = false
        this.wave = 1
        this.lives = 3
        this.restartDelay = this.restartDelay===0?this.currentTime:this.restartDelay
    }

    // RESTART GAME AFTER GAME OVER OR FINISH WAVE
    startGame(speedX, speedY) {
        this.isEnemyStopped = false
        this.shootTime = -999
        this.enemyShootTime = -999
        this.canPlayerMove = true
        this.isBulletAlive = false
        this.enemySpeedX = speedX
        this.enemySpeedY = speedY
        this.restartDelay = 0
        this.allEnemies.setVelocityX(this.enemySpeedX)
        this.livesText.setText('LIVES ' + this.lives)
    }

    detectPlatform() {
        return  this.sys.game.device.os.android ||
                this.sys.game.device.os.iOS ||
                this.sys.game.device.os.kindle ||
                this.sys.game.device.os.windowsPhone
    }

    createEnemies() {
        this.allEnemies = this.physics.add.group()
        this.invaders1 = this.physics.add.group({
            key: 'invader1ss',
            repeat: 6,
            setXY: { x: 120, y:50, stepX: 60 }
        });
        this.allEnemies.addMultiple(this.invaders1.getChildren())
        this.anims.create({
            key: 'invader1-anim',
            frames: this.anims.generateFrameNumbers('invader1ss', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.invaders2 = this.physics.add.group({
            key: 'invader2ss',
            repeat: 6,
            setXY: { x: 120, y:100, stepX: 60 }
        });
        this.allEnemies.addMultiple(this.invaders2.getChildren())
        this.anims.create({
            key: 'invader2-anim',
            frames: this.anims.generateFrameNumbers('invader2ss', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.invaders3 = this.physics.add.group({
            key: 'invader2ss',
            repeat: 6,
            setXY: { x: 120, y:150, stepX: 60 }
        });
        this.allEnemies.addMultiple(this.invaders3.getChildren())
        this.invaders4 = this.physics.add.group({
            key: 'invader3ss',
            repeat: 6,
            setXY: { x: 120, y:200, stepX: 60 }
        });
        this.allEnemies.addMultiple(this.invaders4.getChildren())
        this.anims.create({
            key: 'invader3-anim',
            frames: this.anims.generateFrameNumbers('invader3ss', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.invaders5 = this.physics.add.group({
            key: 'invader3ss',
            repeat: 6,
            setXY: { x: 120, y:250, stepX: 60 }
        });
        this.allEnemies.addMultiple(this.invaders5.getChildren())
        this.physics.add.collider(this.allEnemies, this.player, this.playerHitByEnemy, null, this);
    }

    moveEnemies() {
        if (this.isEnemyStopped) {
            return
        }
        // Calculate the lower and higher x of all enemies
        var maxX = 0
        var minX = 600
        this.allEnemies.children.iterate(function (child) {
            if (child.x > maxX) {
                maxX = child.x
            }
            if (child.x < minX) {
                minX = child.x
            }                
        })
        var moveDown = false
        if (maxX > 570) {
            this.allEnemies.setVelocityX(-this.enemySpeedX)
            moveDown = true
        }
        if (minX < 30) {
            this.allEnemies.setVelocityX(this.enemySpeedX)
            moveDown = true
        }
        if (moveDown) {
            moveDown = false
            var enemySpeedY = this.enemySpeedY
            this.allEnemies.children.iterate(function (child) {
                child.y = child.y + enemySpeedY
            });
        }
    }

    startEnemiesMovement() {
        // INITAL ENEMY MOVEMENT
        this.allEnemies.setVelocityX(this.enemySpeedX)
        this.allEnemies.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
        })
    }

    animateEnemies() {
        // ENEMIES ANIMATION
        this.invaders1.children.iterate(function (child) {
            child.anims.play('invader1-anim', true);
        });
        this.invaders2.children.iterate(function (child) {
            child.anims.play('invader2-anim', true);
        });
        this.invaders3.children.iterate(function (child) {
            child.anims.play('invader2-anim', true);
        });
        this.invaders4.children.iterate(function (child) {
            child.anims.play('invader3-anim', true);
        });
        this.invaders5.children.iterate(function (child) {
            child.anims.play('invader3-anim', true);
        });
    }

    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}
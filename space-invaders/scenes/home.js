export class Home extends Phaser.Scene {
    constructor() {
      super({ key: 'home' });
    }
  
    preload() {
        //images
        this.load.spritesheet('invader2ss', 
            '../assets/invader2ss.png',
            { frameWidth: 44, frameHeight: 32 }
        );
        // fonts
        this.loadFont("someFont", "../assets/fonts/someFont.ttf")
    }
    
    create() {
        this.add.text(130, 200, 'RETRO SHOOT\'EM UP', { fontFamily: 'someFont', fontSize: '48px', fill: '#fff' });
        this.add.text(210, 300, 'TAP TO START', { fontFamily: 'someFont', fontSize: '32px', fill: '#fff' });
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.anims.create({
            key: 'invader2-anim',
            frames: this.anims.generateFrameNumbers('invader2ss', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        var invader = this.physics.add.sprite(290, 400, 'invader2ss')
        invader.anims.play('invader2-anim', true);
        invader.setScale(1.5)

    }

    update() {
        if (this.keySpace.isDown) {
            this.scene.start('game')
        }
    }

    //////
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
  }
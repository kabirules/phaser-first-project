export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }

    preload() {
        this.load.image('plane', 'assets/plane.png');
    }

    create(){
        this.plane = this.physics.add.sprite(300, 550, 'plane');
        this.plane.setScale(0.3)
        this.plane.setCollideWorldBounds(true);
        // INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        var currentVelocityX = Math.abs(this.plane.body.velocity.x>300?300:this.plane.body.velocity.x)
        currentVelocityX = currentVelocityX<20?20:currentVelocityX
        if (this.keySpace.isDown) {
            this.plane.setVelocityX(currentVelocityX+10)
        } else {
            this.plane.setVelocityX(currentVelocityX-20)
        }

    }
}
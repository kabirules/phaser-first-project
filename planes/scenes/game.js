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
        //this.plane.setDamping(true);
        this.plane.setDrag(0.99);
        this.plane.setMaxVelocity(300);
        // INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.plane.body.angularVelocity = -200
        } else if (this.cursors.right.isDown) {
            this.plane.body.angularVelocity = +200
        } else {
            this.plane.body.angularVelocity = 0
        }
        if (this.keySpace.isDown) {
            this.physics.velocityFromRotation(this.plane.rotation, 200, this.plane.body.acceleration);
        } else {
            this.plane.setAcceleration(0);
        }
        this.physics.world.wrap(this.plane, 32)
    }
}
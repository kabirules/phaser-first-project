export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }

    preload() {
        this.load.image('plane', 'assets/plane.png');
    }

    create(){
        this.plane = this.physics.add.sprite(10, 750, 'plane');
        this.plane.setScale(0.1)
        this.plane.setCollideWorldBounds(true);
        //this.plane.setDamping(true);
        this.plane.setDrag(0.99);
        this.plane.setMaxVelocity(200);
        // INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.plane.body.angularVelocity = -100
        } else if (this.cursors.right.isDown) {
            this.plane.body.angularVelocity = +100
        } else {
            this.plane.body.angularVelocity = 0
        }
        if (this.keySpace.isDown) {
            this.physics.velocityFromRotation(this.plane.rotation, 50, this.plane.body.acceleration);
        } else {
            this.plane.setAcceleration(0)
            this.plane.body.velocity.x = Math.abs(this.plane.body.velocity.x - 10)
            this.plane.body.velocity.y = Math.abs(this.plane.body.velocity.y - 10)
        }
        this.physics.world.wrap(this.plane, 32)
    }
}
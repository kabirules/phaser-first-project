import Phaser from 'phaser'
import io from 'socket.io-client';

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}

	preload()
    {
        this.load.setBaseURL('http://labs.phaser.io')

        this.load.image('sky', 'assets/skies/space3.png')
        this.load.image('logo', 'assets/sprites/phaser3-logo.png')
        this.load.image('red', 'assets/particles/red.png')

    }

    create()
    {
        this.scoreAText = ""
        this.scoreBText = ""
        this.scoreA = 0
        this.scoreB = 0
        
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.scoreAText = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#fff' });
        this.scoreBText = this.add.text(516, 16, 'score: 0', { fontSize: '16px', fill: '#fff' });

        this.isPlayerA = false;
        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
        	console.log('Connected!');
        });

		this.socket.on('isPlayerA', function () {
            console.log('isPlayerA emission received!');
        	self.isPlayerA = true;
        })

        const logo = this.physics.add.image(400, 100, 'logo')


        this.socket.on('updateScore', function () {
            console.log('updateScore')
            self.scoreB = self.scoreB + 1;
        	self.scoreBText.setText('score: ' + self.scoreB)
        })

    }

    update() {
        if (this.keySpace.isDown) {
            this.scoreA = this.scoreA + 1;
            this.scoreAText.setText('score: ' + this.scoreA)
            this.socket.emit("scoreUpdated", this.isPlayerA);
        }
    }
}
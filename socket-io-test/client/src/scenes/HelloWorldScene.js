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
        this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    }

    create()
    {
        this.scoreA = 0
        this.scoreB = 0
        
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.scoreAText = this.add.text(16, 16, 'player A score: 0', { fontSize: '16px', fill: '#fff' })
        this.scoreBText = this.add.text(516, 16, 'player B score: 0', { fontSize: '16px', fill: '#fff' })

        self.isPlayerA = false;
        this.socket = io('http://localhost:3000');
        this.socket.updateScores = false

        this.socket.on('connect', function () {
        	console.log('Connected!');
        });

		this.socket.on('isPlayerA', function () {
            console.log('You are the PlayerA');
        	self.isPlayerA = true;
        })

        const logo = this.physics.add.image(400, 100, 'logo')

        this.socket.on('updateScore', function (isPlayerA, score) {
            this.isPlayerA = isPlayerA
            this.score = score
            this.updateScores = true
        })

    }

    update() {
        if (this.keySpace.isDown) {
            if (self.isPlayerA) {
                this.scoreA = this.scoreA + 1;
                this.scoreAText.setText('player A score: ' + this.scoreA)
                this.socket.emit("scoreUpdated", true, this.scoreA);
            } else {
                this.scoreB = this.scoreB + 1;
                this.scoreBText.setText('player B score: ' + this.scoreB)
                this.socket.emit("scoreUpdated", false, this.scoreB);
            }
        }

        if (this.socket.updateScores) {
            if (this.socket.isPlayerA && !self.isPlayerA) {
                this.scoreA = this.socket.score
                this.scoreAText.setText('player A score: ' + this.scoreA)
            }
            if (!this.socket.isPlayerA && self.isPlayerA) {
                this.scoreB = this.socket.score
                this.scoreBText.setText('player B score: ' + this.scoreB)
            }
            this.socket.updateScores = false
        }
    }
}
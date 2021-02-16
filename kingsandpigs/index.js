import { Game } from './scenes/game.js';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    scene: [Game]
};

var game = new Phaser.Game(config);
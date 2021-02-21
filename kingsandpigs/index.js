import { Game } from './scenes/game.js';

const config = {
    type: Phaser.AUTO,
    width: 1152,
    height: 576,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: [Game]
};

var game = new Phaser.Game(config);
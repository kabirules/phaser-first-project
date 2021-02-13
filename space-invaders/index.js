import { Game } from './space-invaders.js';

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [Game]
};

var game = new Phaser.Game(config);
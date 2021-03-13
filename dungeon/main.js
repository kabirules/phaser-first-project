import { Game } from './scenes/Game.js';

const config = {
    type: Phaser.AUTO,
    width: 48*16,
    height: 24*16,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [Game]
};

var game = new Phaser.Game(config);
import { Game } from './scenes/game.js';
import { Home } from './scenes/home.js';


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
    scene: [Home, Game]
};

var game = new Phaser.Game(config);
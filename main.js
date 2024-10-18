import Phaser from 'phaser';
import './style.css';
import { scenes } from './src/scenes';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 360,
  height: 200,
  title: 'boomberman',
  url: import.meta.env.URL || '',
  version: import.meta.env.VERSION || '0.0.1',
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: scenes,
});

import Phaser from 'phaser';
import './style.css';
import { scenes } from './src/scenes';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  title: 'boomberman',
  url: import.meta.env.URL || '',
  version: import.meta.env.VERSION || '0.0.1',
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: scenes,
});

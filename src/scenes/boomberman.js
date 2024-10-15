import boombermanJSON from '../assets/boomberman.json';

export class boomberman extends Phaser.Scene {
  constructor() { 
    super('boombermanScene');
  }

  preload() {
    this.load.image('boomberman', 'src/assets/boomberman.png');
    this.load.tilemapTiledJSON('map', 'src/assets/boomberman.json');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    
    const tileset = map.addTilesetImage('boombermanTileset', 'boomberman', 16, 16);
    
    const gorundLayer = map.createLayer('ground', tileset, 0, 0);
    const wallsLayer = map.createLayer('walls', tileset, 0, 0);
  }
}


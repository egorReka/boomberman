// import boombermanJSON from '../assets/boomberman.json';
import { Player } from '../entities/player';

export class boomberman extends Phaser.Scene {
  player;

  constructor() { 
    super('boombermanScene');
  }

  preload() {
    this.load.image('boomberman', 'src/assets/boomberman.png');
    this.load.tilemapTiledJSON('map', 'src/assets/boomberman.json');
    this.load.spritesheet('player', 'src/assets/characters/player1.png',
      {
        frameWidth: 16,
        frameHeight: 16
      });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    
    const tileset = map.addTilesetImage('boombermanTileset', 'boomberman', 16, 16);
    
    const gorundLayer = map.createLayer('ground', tileset, 0, 0);
    const wallsLayer = map.createLayer('walls', tileset, 0, 0);

    this.player = new Player(this, 24, 56, 'player');

    // слежение по камере за игроком
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // границы игрового мира
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);

    // коллизия игрока с стенами
    this.physics.add.collider(this.player, wallsLayer);
    wallsLayer.setCollisionByExclusion([-1]);
    
  }

  update(time, delta) {
    this.player.update(delta);
  }
}


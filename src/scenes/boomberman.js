import boombermanImage from '../assets/boomberman.png';
import mapJSON from '../assets/boomberman.json';
import playerSprite from '../assets/characters/player1.png';
import bombSprite from '../assets/characters/bomb.png';
import explosionSprite from '../assets/characters/explosion.png';
import destroyBlockSprite from '../assets/characters/destroy-block.png';
import valcomSprite from '../assets/characters/enemy/valcom.png';
import onealSprite from '../assets/characters/enemy/oneal.png';
import ovapeSprite from '../assets/characters/enemy/ovape.png';
import doraSprite from '../assets/characters/enemy/dora.png';
import dahlSprite from '../assets/characters/enemy/dahl.png';

import { Enemy } from '../entities/enemy';
import { Player } from '../entities/player';

export class boomberman extends Phaser.Scene {
  player;
  bomb;
  valcom;
  oneal;
  ovape;
  dora;
  dahl;

  constructor() { 
    super('boombermanScene');
  }
  
  preload() {
    this.load.image('boomberman', boombermanImage);
    this.load.tilemapTiledJSON('map', mapJSON);
    this.load.spritesheet('player', playerSprite, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('bomb', bombSprite, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('explosion', explosionSprite, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('destroy-block', destroyBlockSprite, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('valcom', valcomSprite, { frameWidth: 16, frameHeight: 16 });  
    this.load.spritesheet('oneal', onealSprite, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('ovape', ovapeSprite, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('dora', doraSprite, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('dahl', dahlSprite, { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    
    const tileset = map.addTilesetImage('boombermanTileset', 'boomberman', 16, 16);
    
    const gorundLayer = map.createLayer('ground', tileset, 0, 0);
    const wallsLayer = map.createLayer('walls', tileset, 0, 0);
    const boxesLayer = map.createLayer('boxes', tileset, 0, 0);
    const bombLayer = map.createLayer('bomb', tileset, 0, 0);

    this.player = new Player(this, 24, 56, 'player', map);
    this.valcom = new Enemy(this, 440, 55, 'valcom');
    this.oneal = new Enemy(this, 160, 55, 'oneal');
    this.ovape = new Enemy(this, 152, 200, 'ovape');
    this.dora = new Enemy(this, 312, 264, 'dora');
    this.dahl = new Enemy(this, 248, 120, 'dahl');

    // слежение по камере за игроком
    this.cameras.main.startFollow(this.player);
    // границы камеры
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // границы игрового мира
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // this.player.setCollideWorldBounds(true); // TODO нужно ли, есть boxesLayer.setCollisionByExclusion([-1]);?
    // this.enemy.setCollideWorldBounds(true); // TODO...

    // коллизия игрока со стенами
    this.physics.add.collider(this.player, [boxesLayer, wallsLayer]);
    // коллизия врага со стенами
    this.physics.add.collider(this.valcom, [wallsLayer, boxesLayer], () => this.valcom.changeDirection(), null, this);
    this.physics.add.collider(this.oneal, [wallsLayer, boxesLayer], () => this.oneal.changeDirection(), null, this);
    this.physics.add.collider(this.ovape, [wallsLayer, boxesLayer], () => this.ovape.changeDirection(), null, this);
    this.physics.add.collider(this.dora, [wallsLayer, boxesLayer], () => this.dora.changeDirection(), null, this);
    this.physics.add.collider(this.dahl, [wallsLayer, boxesLayer], () => this.dahl.changeDirection(), null, this);
    // столкновение игрока с врагом
    this.physics.add.overlap([this.valcom, this.oneal, this.ovape, this.dora, this.dahl], this.player, this.handlePlayerTakeDamage, null, this);    
    
    boxesLayer.setCollisionByExclusion([-1]);
    wallsLayer.setCollisionByExclusion([-1]);
  }

  handlePlayerTakeDamage() {    
    this.player.takeDamage();
  }

  update(time, delta) {    
    this.player.update(delta);
    this.valcom.update(delta);
    this.oneal.update(delta);
    this.ovape.update(delta);
    this.dora.update(delta);
    this.dahl.update(delta);
  }
}

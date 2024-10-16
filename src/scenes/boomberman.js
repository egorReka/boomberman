import { Enemy } from '../entities/enemy';
import { Player } from '../entities/player';
import { Bomb } from '../entities/bomb';

export class boomberman extends Phaser.Scene {
  player;
  enemy;
  bomb;

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
    
    this.load.spritesheet('valcom', 'src/assets/characters/enemy/valcom.png',
      {
        frameWidth: 16,
        frameHeight: 16
      });
    
    this.load.spritesheet('bomb', 'src/assets/characters/bomb.png',
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
    const boxesLayer = map.createLayer('boxes', tileset, 0, 0);
    const bombLayer = map.createLayer('bomb', tileset, 0, 0);

    this.player = new Player(this, 24, 56, 'player', map);
    this.enemy = new Enemy(this, 440, 55, 'valcom');

    // слежение по камере за игроком
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // границы игрового мира
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player.setCollideWorldBounds(true);
    this.enemy.setCollideWorldBounds(true);

    // коллизия игрока со стенами
    this.physics.add.collider(this.player, wallsLayer);
    wallsLayer.setCollisionByExclusion([-1]);

    this.physics.add.collider(this.player, boxesLayer);
    boxesLayer.setCollisionByExclusion([-1]);

    // коллизия врага со стенами
    this.physics.add.collider(this.enemy, wallsLayer, this.handleEnemyCollision, null, this);
    wallsLayer.setCollisionByExclusion([-1]);

    this.physics.add.collider(this.enemy, boxesLayer, this.handleEnemyCollision, null, this);
    boxesLayer.setCollisionByExclusion([-1]);

    this.physics.add.overlap(this.enemy, this.player, this.handlePlayerEnemyCollision, null, this);
  }

  handleEnemyCollision() {
    this.enemy.changeDirection();
  }

  handlePlayerEnemyCollision() {
    if (!this.player.getData("isDead")) {
      this.player.setData("isDead", true);
      this.player.anims.play('dead', true);
      this.player.setVelocity(0, 0);
    }
  }

  update(time, delta) {    
    this.player.update(delta);
    this.enemy.update(delta);

    if (this.bomb) {
      this.bomb.update();
    }
  }
}

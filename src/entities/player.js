import { Entity } from './entity';
import { Bomb } from './bomb';

export class Player extends Entity {
  textureKey;
  _moveSpeed;

  constructor(scene, x, y, texture, map) {
    super(scene, x, y, texture, 'player');

    const anims = this.scene.anims;
    const animsFrameReate = 6;
    this.textureKey = texture;
    this._moveSpeed = 2;
    this.setSize(12, 12);
    this.setOffset(2, 2);
    this.setDepth(1);
    this.setData("isDead", false);
    this.map = map;
    this.setupKeysListener();

    anims.create({
      key: 'down',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 2,
      }),
      frameRate: animsFrameReate,
      repeat: -1,
    });

    anims.create({
      key: 'left',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 3,
        end: 5,
      }),
      frameRate: animsFrameReate,
      repeat: -1,
    });
    
    anims.create({
      key: 'right',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 6,
        end: 8,
      }),
      frameRate: animsFrameReate,
      repeat: -1,
    });
    
    anims.create({
      key: 'up',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 9,
        end: 11,
      }),
      frameRate: animsFrameReate,
      repeat: -1,
    });

    anims.create({
      key: 'dead',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 12,
        end: 20,
      }),
      frameRate: animsFrameReate,
      repeat: 0,
    });
  }

  setupKeysListener() {
    this.scene.input.keyboard.on('keydown-SPACE', () => {
      
      if (!this.scene.bomb) {
        // Преобразуем мировые координаты игрока (this.x, this.y) в тайловые
        const tileX = this.map.worldToTileX(this.x);
        const tileY = this.map.worldToTileY(this.y);
  
        // Преобразуем тайловые координаты обратно в мировые для центрирования бомбы
        const worldX = this.map.tileToWorldX(tileX) + this.map.tileWidth / 2;
        const worldY = this.map.tileToWorldY(tileY) + this.map.tileHeight / 2;
  
        this.createBomb(worldX, worldY);
      }
    });
  }

  createBomb(x, y) { 
    this.scene.bomb = new Bomb(this.scene, x, y, 'bomb', this.map, this); // TODO: Исправить логику создания бомбы, добавить колапс при столкновении с игроком
  }

  takeDamage() {
    if (!this.getData('isDead')) {
      this.setData('isDead', true);
      this.anims.play('dead');
      this.setVelocity(0, 0);
      this.scene.physics.world.disableBody(this.body);
      console.log('Игрок погиб');
    }
  }

  update(delta) {   
    if (this.getData("isDead")) {
      return;
    }

    const keys = this.scene.input.keyboard.createCursorKeys();

    if (keys.up.isDown) {
      this.anims.play('up', true);
      this.setVelocity(0, -delta * this._moveSpeed);
    } else if (keys.down.isDown) {
      this.anims.play('down', true);
      this.setVelocity(0, delta * this._moveSpeed);
    } else if (keys.left.isDown) {
      this.anims.play('left', true);
      this.setVelocity(-delta * this._moveSpeed, 0);
    } else if (keys.right.isDown) {
      this.anims.play('right', true);
      this.setVelocity(delta * this._moveSpeed, 0);
    } else { 
      this.setVelocity(0, 0);
      this.stop();
    }
  }
}

import { Entity } from './entity';

export class Enemy extends Entity { 
  textureKey;
  _moveSpeed;
  direction;

  constructor(scene, x, y, texture, type) { 
    super(scene, x, y, texture);

    const anims = this.scene.anims;
    const animsFrameReate = 3;
    this.textureKey = texture;
    this.direction = this.getRandomDirection();
    this._moveSpeed = 1;
    this.setSize(15, 15);
    this.setOffset(1, 1);    

    anims.create({
      key: 'enemy-up-down',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 5,
      }),
      frameRate: animsFrameReate,
      repeat: -1,
    });

    anims.create({
      key: 'enemy-right',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 2,
      }),
      frameRate: animsFrameReate,
      repeat: -1,
    });

    anims.create({
      key: 'enemy-left',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 3,
        end: 5,
      }),
      frameRate: animsFrameReate,
      repeat: -1,
    });
  }

  getRandomDirection() {
    const rand = Math.floor(Math.random() * 4);
    switch (rand) {
      case 0: return 'up';
      case 1: return 'down';
      case 2: return 'left';
      case 3: return 'right';
    }
  }

  changeDirection() {
    this.direction = this.getRandomDirection();
  }

  update(delta) {
    switch (this.direction) {
      case 'up':
        this.anims.play('enemy-up-down', true);
        this.setVelocity(-0, delta * this._moveSpeed);
        break;
      case 'down':
        this.anims.play('enemy-up-down', true);
        this.setVelocity(0, delta * this._moveSpeed);
        break;
      case 'left':
        this.anims.play('enemy-left', true);
        this.setVelocity(-delta * this._moveSpeed, 0);
        break;
      case 'right':
        this.anims.play('enemy-right', true);
        this.setVelocity(delta * this._moveSpeed, 0);
        break;
    }
  }
}

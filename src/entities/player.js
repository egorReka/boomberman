import { Entity } from './entity';

export class Player extends Entity {
  textureKey;
  _moveSpeed;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture, 'player');

    const anims = this.scene.anims;
    const animsFrameReate = 6;
    this.textureKey = texture;
    this._moveSpeed = 2;
    this.setSize(10, 10);
    this.setOffset(3, 4);
    this.setDepth(1);
    this.setData("isDead", false);

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

    this.on('animationcomplete', (animation) => {
      if (animation.key === 'dead') {
        this.setData("isDead", true);
        this.setVelocity(0, 0);
        this.visible = false;
      }
    });
  }

  update(delta) {   
    if (this.getData("isDead")) {
      return;
    }

    const keys = this.scene?.input.keyboard.createCursorKeys();

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

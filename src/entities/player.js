import { Entity } from './entity';

export class Player extends Entity {
  textureKey;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture, 'player');

    const anims = this.scene.anims;
    const animsFrameReate = 9;
    this.textureKey = texture;

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
  }

  update(delta) {
    const keys = this.scene.input.keyboard.createCursorKeys();

    if (keys.up.isDown) {
      this.anims.play('up', true);
      this.setPosition(this.x, this.y - delta * 0.1);
    } else if (keys.down.isDown) {
      this.anims.play('down', true);
      this.setPosition(this.x, this.y + delta * 0.1);
    } else if (keys.left.isDown) {
      this.anims.play('left', true);
      this.setPosition(this.x - delta * 0.1, this.y);
    } else if (keys.right.isDown) {
      this.anims.play('right', true);
      this.setPosition(this.x + delta * 0.1, this.y);
    } else { 
      this.stop();
    }
  }
}
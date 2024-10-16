import { Entity } from './entity';

export class Bomb extends Entity {
  textureKey;

  constructor(scene, x, y, texture) { 
    super(scene, x, y, texture, 'bomb');

    const anims = this.scene.anims;
    const animsFrameReate = 4;
    this.textureKey = texture;

    anims.create({
      key: 'tick',
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 2,
      }),
      frameRate: animsFrameReate,
      repeat: -1,
    });
  }

  update() {
    this.anims.play('tick', true);
  }
}
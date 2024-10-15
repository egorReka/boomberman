export class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, type) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.scene.add.existing(this);
  }
}
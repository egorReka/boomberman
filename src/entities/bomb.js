import { Entity } from './entity';

export class Bomb extends Entity {
  textureKey;
  explosionRange = 1;
  bombTimer = 2;

  constructor(scene, x, y, texture, map, player) { 
    super(scene, x, y, texture, 'bomb');

    this.scene = scene;
    this.map = map;
    this.player = player;
    const anims = this.scene.anims;
    const animsFrameRate = 4;
    this.textureKey = texture;

    // Таймер для взрыва
    this.scene.time.delayedCall(this.bombTimer * 1000, this.explode, [], this);

    // Анимация для тика
    anims.create({
      key: 'tick',
      frames: anims.generateFrameNumbers(this.textureKey, { start: 0, end: 2 }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    // Анимация для центрального взрыва
    anims.create({
      key: 'explode-center',
      frames: anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0,
    });

    // Анимация взрыва для направления "влево"
    anims.create({
      key: 'explode-right',
      frames: anims.generateFrameNumbers('explosion', { start: 4, end: 11 }),
      frameRate: 10,
      repeat: 0,
    });

    // Анимация взрыва для направления "вправо"
    anims.create({
      key: 'explode-left',
      frames: anims.generateFrameNumbers('explosion', { start: 12, end: 19 }),
      frameRate: 10,
      repeat: 0,
    });

    // Анимация взрыва для направления "вверх"
    anims.create({
      key: 'explode-up',
      frames: anims.generateFrameNumbers('explosion', { start: 20, end: 27 }),
      frameRate: 10,
      repeat: 0,
    });

    // Анимация взрыва для направления "вниз"
    anims.create({
      key: 'explode-down',
      frames: anims.generateFrameNumbers('explosion', { start: 28, end: 35 }),
      frameRate: 10,
      repeat: 0,
    });

    // Анимация разрушения блока
    anims.create({
      key: 'destroy-block',
      frames: anims.generateFrameNumbers('destroy-block', { start: 1, end: 7 }),
      frameRate: 8,
      repeat: 0,
    });

    this.anims.play('tick');
    this.scene.physics.add.collider(this, [this.scene.valcom, this.scene.oneal, this.scene.ovape, this.scene.dora, this.scene.dahl], (bomb, enemy) => this.handleBombСollision(bomb, enemy), null, this);
  }

  explode() {
    this.createExplosion();
    this.scene.bomb = null; 
    this.destroy();
  }

  handleBoxDestruction(tile) {
    // Удаляем тайл из boxesLayer
    this.map.removeTileAt(tile.x, tile.y, true, true, 'boxes');

    // Создаем анимацию разрушения
    const worldX = this.map.tileToWorldX(tile.x) + this.map.tileWidth / 2;
    const worldY = this.map.tileToWorldY(tile.y) + this.map.tileHeight / 2;
    const destruction = this.scene.add.sprite(worldX, worldY, 'destroy-block');
    destruction.play('destroy-block');

    // Удаляем спрайт разрушения после анимации
    destruction.on('animationcomplete', () => {
      destruction.destroy();
    });
  }

  createExplosion() {
    const directions = ['up', 'down', 'left', 'right'];
    
    // Создаём центральный взрыв
    const centerExplosion = this.scene.add.sprite(this.x, this.y, 'explosion');
    centerExplosion.play('explode-center');
    this.scene.time.delayedCall(500, () => centerExplosion.destroy());  

    // Создаём лучи в 4 направлениях
    directions.forEach((direction) => {
      for (let i = 1; i <= this.explosionRange; i++) {
        let offsetX = 0;
        let offsetY = 0;

        switch (direction) {
          case 'up':
            offsetY = -i * this.map.tileHeight;
            break;
          case 'down':
            offsetY = i * this.map.tileHeight;
            break;
          case 'left':
            offsetX = -i * this.map.tileWidth;
            break;
          case 'right':
            offsetX = i * this.map.tileWidth;
            break;
        }

        const explosionX = this.x + offsetX;
        const explosionY = this.y + offsetY;

        // Проверка на выход за границы карты
        if (
          explosionX < 0 || explosionY < 0 ||
          explosionX > this.map.widthInPixels ||
          explosionY > this.map.heightInPixels
        ) {
          break;
        }

        // Проверка столкновения со стеной
        const tile = this.map.getTileAtWorldXY(
          explosionX, explosionY, true, this.scene.cameras.main, 'walls'
        );
        if (tile && tile.index !== -1) break;

        // Проверка на коробку
        const boxTile = this.map.getTileAtWorldXY(
          explosionX, explosionY, true, this.scene.cameras.main, 'boxes'
        );

        if (boxTile && boxTile.index !== -1) {
          this.handleBoxDestruction(boxTile);
          break;
        }      

        // Создание спрайта для анимации взрыва
        const explosion = this.scene.add.sprite(explosionX, explosionY, 'explosion');
        this.scene.physics.add.existing(explosion);
        this.scene.physics.add.overlap(explosion, this.player, this.handlePlayerTakeDamage, null, this.scene);
        this.scene.physics.add.overlap(explosion, [this.scene.valcom, this.scene.oneal, this.scene.ovape, this.scene.dora, this.scene.dahl], (explosion, enemy) => this.handleEnemyTakeDamage(explosion, enemy), null, this.scene); // TODO исправить
        
        // Выбор нужной анимации для взрыва по направлению
        explosion.play(`explode-${direction}`);

        // Удаление спрайта после завершения анимации
        this.scene.time.delayedCall(500, () => explosion.destroy());
      }
    });
  }

  // Проверка пересечения взрыва с игроком или врагом
  handlePlayerTakeDamage() {
    this.player.takeDamage();
  }

  handleEnemyTakeDamage(explosion, enemy) {
    enemy.takeDamage();
  }

  handleBombСollision(bomb, enemy) {    
    enemy.changeDirection();
    bomb.setVelocity(0, 0); // TODO костыль, нужно убрать
  }
}

import "phaser";

export class OfficeScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private pointsInfo: Phaser.GameObjects.Text | null = null;

  constructor() {
    super("OfficeScene");
  }

  preload() {
    // Загружаем карту и тайлсет (файлы из public/assets/)
    this.load.tilemapTiledJSON("officeMap", "assets/office.json");
    this.load.image("tileset", "assets/office.png");
    this.load.spritesheet("player", "assets/user.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    // Создаем карту из Tiled JSON
    const map = this.make.tilemap({ key: "officeMap" });
    const tileset = map.addTilesetImage("office", "tileset");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const wallsLayer = map.createLayer("walls", tileset, 0, 0);

    // Включаем коллизии для стен (если есть слой "walls")
    if (wallsLayer) {
        //wallsLayer.setCollisionByExclusion([-1]);
        //wallsLayer.setCollisionByExclusion([], true);
        wallsLayer.setCollisionByProperty({ collides: true });
        
    }

    // Создаем игрока
    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, wallsLayer);

    // Настройка управления с клавиатуры
    this.cursors = this.input.keyboard.createCursorKeys();

    // Создаем текст для вывода информации о точках
    this.pointsInfo = this.add.text(10, 10, "", {
      font: "16px Arial",
      color: "#ffffff",
      backgroundColor: "#000000",
    });

    // Обрабатываем объекты из Tiled (например, точки событий)
    const points = map.getObjectLayer("points")?.objects;
    points?.forEach((point) => {
      const zone = this.add.zone(point.x, point.y, point.width, point.height);
      this.physics.add.existing(zone, true); // Делаем зону статической
      this.physics.add.overlap(
        this.player,
        zone,
        () => {
          if (this.pointsInfo) {
            this.pointsInfo.setText(point.properties?.info || "Точка активирована!");
          }
        },
        undefined,
        this
      );
    });
  }

  update() {
    // Движение игрока
    const speed = 100;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}
import "phaser";
import { OfficeScene } from "./scenes/OfficeScene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container", // ID контейнера в React
  width: 1280,
  height: 600,
  scene: [OfficeScene],     // Основная сцена
  physics: {
    default: "arcade",
    arcade: {
      gravity: {x: 0, y: 0 },
      debug: true,         // Включить для отладки коллизий
    },
  },
};
import React, { useEffect, useRef } from "react";
import { GameConfig } from "./game/config";
import Phaser from "phaser";

export const App = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameContainerRef.current) return;

    const game = new Phaser.Game({
      ...GameConfig,
      parent: gameContainerRef.current,
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainerRef} id="game-container" />;
};
import React from "react";
import styles from "./Game.module.css";
import Word from "./components/Word.js";

function Game() {
  return (
    <>
      <ul className={styles.game}>
        <Word></Word>
        <Word></Word>
        <Word></Word>
        <Word></Word>
        <Word></Word>
        <Word></Word>
      </ul>
    </>
  );
}

export default Game;

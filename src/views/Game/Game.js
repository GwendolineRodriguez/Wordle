import React from "react";
import styles from "./Game.module.css";
import Word from "./components/Word.js";

function Game() {
  let submitWord = (word) => {
    console.log("result", word);
    //use effect
  };
  return (
    <>
      <ul className={styles.game}>
        {new Array(6).fill(null).map((x, i) => {
          let autofocus = false;
          if (i === 0) autofocus = true;
          return (
            <Word key={i} autofocus={autofocus} submitWord={submitWord}></Word>
          );
        })}
      </ul>
    </>
  );
}

export default Game;

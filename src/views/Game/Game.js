import React, { useContext } from "react";
import styles from "./Game.module.css";
import Word from "./components/Word.js";
import WordContext from "./WordContext.js";

function Game() {
  const wordCtx = useContext(WordContext);

  let goToNextWord = () => {
    // createRefs of first letter of next word
  };

  let submitWord = async (word) => {
    if (!wordCtx.isWordValid(word.join(""))) {
      console.log("Word is not Valid !!");
      return;
    }
    console.log("Word of the day is", wordCtx.wordOfTheDay);
    // compare submitWord and wordOfTheDay
    // match wich ones are equal or wrong place
    // if all right place => END GAME
    // if any mistake => goToNextWord()
  };

  return (
    <ul className={styles.game}>
      {new Array(6).fill(null).map((x, i) => {
        let autofocus = false;
        if (i === 0) autofocus = true;
        return (
          <Word key={i} autofocus={autofocus} submitWord={submitWord}></Word>
        );
      })}
    </ul>
  );
}

export default Game;

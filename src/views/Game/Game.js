import React, { useContext, useState, createRef } from "react";
import styles from "./Game.module.css";
import Word from "./components/Word.js";
import WordContext from "./WordContext.js";

function Game() {
  const wordCtx = useContext(WordContext);
  let [words, setWords] = useState(new Array(6).fill(null));
  let firstLetterWordRefs = words.map((_) => createRef());

  let goToNextWord = () => {
    wordCtx.currentWordId++;
    console.log(wordCtx.currentWordId);
    firstLetterWordRefs[wordCtx.currentWordId].current.focus();
  };

  let submitWord = async (word) => {
    // console.log(word);
    if (!wordCtx.isWordValid(word.join(""))) {
      console.log("Word is not Valid !!");
      return;
    }
    goToNextWord();
    console.log("Word of the day is", wordCtx.wordOfTheDay);
    // compare submitWord and wordOfTheDay
    // match wich ones are equal or wrong place
    // if all right place => END GAME
    // if any mistake => goToNextWord()
  };

  return (
    <ul className={styles.game}>
      {words.map((_, i) => {
        let autofocus = false;
        if (i === 0) autofocus = true;
        return (
          <Word
            key={i}
            autofocus={autofocus}
            submitWord={submitWord}
            refIdFirstLetter={firstLetterWordRefs[i]}
          ></Word>
        );
      })}
    </ul>
  );
}

export default Game;

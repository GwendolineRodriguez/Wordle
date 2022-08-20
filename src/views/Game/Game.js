import React, { useContext, useState, createRef } from "react";
import styles from "./Game.module.css";
import Word from "./components/Word.js";
import WordContext from "./WordContext.js";

function Game() {
  const wordCtx = useContext(WordContext);
  console.log(wordCtx);

  let [words, setWords] = useState(new Array(6).fill(null));
  let firstLetterWordRefs = words.map((_) => createRef());

  let goToNextWord = () => {
    console.log(wordCtx);
    wordCtx.currentWordId++;
    // console.log(wordCtx.currentWordId);
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
        let autofocus = i === wordCtx.currentWordId;
        // if (i === wordCtx.currentWordId) autofocus = true;
        // console.log("autofocus", i, autofocus);
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

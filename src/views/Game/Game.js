import React, { useContext, useState, createRef, useMemo } from "react";
import styles from "./Game.module.css";
import Word from "./components/Word.js";
import WordContext from "./WordContext.js";
import LetterState from "./LetterState.js";

function Game() {
  const wordCtx = useContext(WordContext);

  let [words, setWords] = useState(
    new Array(6).fill(null).map(() =>
      new Array(5).fill(null).map((_, i) => {
        let letter = {
          value: "",
          state: LetterState.GREY,
          // TODO : make this work to avoid many rerender
          // id: `${i}-${useId()}`,
        };
        return letter;
      })
    )
  );
  const firstLetterWordRefs = useMemo(() => words.map((_) => createRef()), []);

  let goToNextWord = () => {
    wordCtx.currentWordId++;
    firstLetterWordRefs[wordCtx.currentWordId].current.focus();
  };

  let updateWords = (word) => {
    let idx = 0;
    setWords((prev) => {
      let updatedWords = prev.map((item, i) => {
        if (item[0].value !== "") {
          idx = i;
        }
        return item;
      });

      updatedWords.splice(idx, 1, word);
      return updatedWords;
    });
  };

  let checkEndGame = (word) => {
    let isWordFound = wordCtx.checkIfWordFound(word);
    if (isWordFound) {
      // END GAME (toast you win)
    } else {
      goToNextWord();
      console.log("Word of the day is", wordCtx.wordOfTheDay);
    }
  };

  let submitWord = async (word) => {
    let wordIsValid = await wordCtx.isWordValid(word);
    if (!wordIsValid) {
      console.log("Word is not Valid !!");
      // toast that shows it's not valid and they have to refresh to play
      return;
    }
    let updatedWord = wordCtx.checkLettersValidity(word, wordCtx.wordOfTheDay);
    updateWords(updatedWord);
    checkEndGame(updatedWord);
  };

  return (
    <ul className={styles.game}>
      {words.map((word, i) => {
        let autofocus = i === wordCtx.currentWordId;
        let joinedWord = word.map((letter) => letter.value).join("");
        return (
          <Word
            key={i}
            joinedWord={joinedWord}
            wordObj={word}
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

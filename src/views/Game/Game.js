import React, { useContext, useState, createRef, useMemo, useId } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Game.module.css";
import Word from "./components/Word.js";
import WordContext from "./WordContext.js";
import LetterState from "./LetterState.js";

function Game() {
  const wordCtx = useContext(WordContext);
  let [words, setWords] = useState(
    new Array(6).fill(null).map((_) =>
      new Array(5).fill(null).map((_, i) => {
        let letter = {
          value: "",
          state: LetterState.GREY,
          // eslint-disable-next-line react-hooks/rules-of-hooks
          id: `${i}-${useId()}`,
        };
        return letter;
      })
    )
  );
  const firstLetterWordRefs = useMemo(
    () => new Array(6).fill(null).map(() => createRef()),
    []
  );

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
      toast.success("❤️ You found the word 🥳");
    } else {
      goToNextWord();
      console.log("Word of the day is", wordCtx.wordOfTheDay);
    }
  };

  let submitWord = async (word) => {
    let wordIsValid = await wordCtx.isWordValid(word);
    if (!wordIsValid) {
      console.error("Word is not Valid !!");
      toast.info("💥 Word is not valid 💥");
      return;
    }
    let updatedWord = wordCtx.checkLettersValidity(word, wordCtx.wordOfTheDay);
    updateWords(updatedWord);
    checkEndGame(updatedWord);
  };

  return (
    <>
      <ToastContainer
        theme='dark'
        position='top-center'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
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
    </>
  );
}

export default Game;

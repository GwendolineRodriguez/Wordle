import React, { useState, createRef, useEffect } from "react";
import Letter from "./Letter.js";
import styles from "./Word.module.css";
import LetterState from "./../LetterState.js";

function Word({ autofocus, submitWord, refIdFirstLetter }) {
  let [word, setWord] = useState(
    new Array(5).fill(null).map((_) => {
      let letter = { value: "", state: LetterState.GREY };
      return letter;
    })
  );

  let letterRefs = word.map((_, i) => {
    if (i === 0) return refIdFirstLetter;
    return createRef();
  });
  let handleWordSubmit = (e) => {
    e.preventDefault();
    submitWord(word);
  };
  let setLetter = (e) => {
    let id = Number.parseInt(e.target.id);
    let value = e.target.value;
    setWord((prev) => {
      let newWordValue = prev;
      newWordValue[id].value = value;
      console.log(newWordValue);
      moveToNextLetter(id + 1);
      return newWordValue;
    });
  };

  let moveToNextLetter = (id) => {
    if (id < 5) {
      console.log(letterRefs[id]);
      letterRefs[id].current.focus();
    }
  };
  return (
    <li className={styles.word}>
      <form onSubmit={handleWordSubmit}>
        {word.map((letter, i) => {
          let isFocused = i === 0 && autofocus ? true : false;
          return (
            <Letter
              id={i}
              key={i}
              letter={letter}
              setLetter={setLetter}
              autofocus={isFocused}
              refId={letterRefs[i]}
            ></Letter>
          );
        })}
        <input type='submit' hidden />
      </form>
    </li>
  );
}

export default Word;

import React, { useState, createRef } from "react";
import Letter from "./Letter.js";
import styles from "./Word.module.css";

function Word({ autofocus, submitWord }) {
  let [word, setWord] = useState(new Array(5).fill(null));
  let letterRefs = word.map((_) => createRef());
  let handleWordSubmit = (e) => {
    e.preventDefault();
    submitWord(word);
    console.log("word submitted");
  };
  let setLetter = (e) => {
    let id = Number.parseInt(e.target.id);
    let value = e.target.value;
    setWord((prev) => {
      let newWordValue = prev;
      newWordValue[id] = value;
      console.log(newWordValue);
      moveToNextLetter(id + 1);
      return newWordValue;
    });
  };

  let moveToNextLetter = (id) => {
    console.log(letterRefs[id]);
    if (id < 5) {
      letterRefs[id].current.focus();
    }
  };
  return (
    <li className={styles.word}>
      <form onSubmit={handleWordSubmit}>
        {word.map((_, i) => {
          let isFocused = i === 0 && autofocus ? true : false;
          return (
            <Letter
              key={i}
              id={i}
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

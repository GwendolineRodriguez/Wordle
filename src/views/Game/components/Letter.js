import React, { useState } from "react";
import styles from "./Letter.module.css";

function Letter({ id, updateWord, autofocus, refId, letter }) {
  let tabIndex = id === 0 && autofocus ? 1 : -1;
  let [letterValue, setLetter] = useState(letter.value);
  let handleLetterInput = (e) => {
    if (!e.target.checkValidity()) {
      e.target.value = "";
      return;
    }
    updateWord(e.target.id, e.target.value);
    setLetter(e.target.value);
  };

  return (
    <input
      id={id}
      ref={refId}
      autoFocus={autofocus}
      className={styles.letter}
      type='text'
      minLength='1'
      maxLength='1'
      onChange={handleLetterInput}
      pattern='[A-Za-z]'
      tabIndex={tabIndex}
      value={letterValue}
      required
    ></input>
  );
}

export default Letter;

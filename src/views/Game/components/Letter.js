import React from "react";
import styles from "./Letter.module.css";

function Letter({ id, setLetter, autofocus, refId, letter }) {
  let tabIndex = id === 0 && autofocus ? 1 : -1;

  let handleLetterInput = (e) => {
    if (!e.target.checkValidity()) {
      e.target.value = "";
      return;
    }
    setLetter(e);
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
      value={letter.value}
      required
    ></input>
  );
}

export default Letter;

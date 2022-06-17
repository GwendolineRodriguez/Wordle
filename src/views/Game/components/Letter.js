import React from "react";
import styles from "./Letter.module.css";

function Letter({ id, handleInput, autofocus, refId }) {
  let tabIndex = id === 0 && autofocus ? 1 : -1;

  return (
    <input
      id={id}
      ref={refId}
      autoFocus={autofocus}
      className={styles.letter}
      type='text'
      minLength='1'
      maxLength='1'
      onChange={handleInput}
      pattern='[A-Za-z]'
      tabIndex={tabIndex}
      // onkeyup="movetoNext(this, 'second')"
      required
    ></input>
  );
}

export default Letter;

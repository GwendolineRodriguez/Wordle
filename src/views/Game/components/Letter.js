import React from "react";
import styles from "./Letter.module.css";

function Letter({ handleInput }) {
  return (
    <input
      className={styles.letter}
      type='text'
      minLength='1'
      maxLength='1'
      onChange={handleInput}
      pattern='[A-Za-z]'
      required
    ></input>
  );
}

export default Letter;

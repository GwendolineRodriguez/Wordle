import React from "react";
import Letter from "./Letter.js";
import styles from "./Word.module.css";

function Word() {
  let handleWordSubmit = (e) => {
    e.preventDefault();
    console.log("word submitted");
  };
  return (
    <li className={styles.word}>
      <form onSubmit={handleWordSubmit}>
        <Letter></Letter>
        <Letter></Letter>
        <Letter></Letter>
        <Letter></Letter>
        <Letter></Letter>
        <input type='submit' hidden />
      </form>
    </li>
  );
}

export default Word;

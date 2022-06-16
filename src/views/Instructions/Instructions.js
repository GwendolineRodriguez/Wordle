import React from "react";
import styles from "./Instructions.module.css";

function Instructions({ toggleInstructions }) {
  console.log("Instructions");
  return (
    <>
      <section className={styles.Instructions}>
        <header>
          <h2>How to play</h2>
          <button onClick={toggleInstructions}>X</button>
        </header>
        <p>
          Guess the WORDLE in six tries. Each guess must be a valid five-letter
          word. Hit the enter button to submit. After each guess, the color of
          the tiles will change to show how close your guess was to the word.
          <br />A new WORDLE will be available each day!
        </p>
      </section>
    </>
  );
}

export default Instructions;

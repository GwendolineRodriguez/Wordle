import React from "react";
import styles from "./Instructions.module.css";

function Instructions({ toggleInstructions }) {
  return (
    <>
      <section className={styles.Instructions}>
        <header>
          <h2>How to play</h2>
          <button onClick={toggleInstructions}>
            <b>X</b>
          </button>
        </header>
        <p>Guess the WORDLE in six tries.</p>
        <p>
          <br />
          Each guess must be a valid five-letter word.
        </p>
        <p>
          <br />
          Hit the enter button to submit.
        </p>
        <p>
          <br />
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.{" "}
        </p>
        <p>
          <br />A new WORDLE will be available each day!
        </p>
      </section>
    </>
  );
}

export default Instructions;

import React, { useState, useEffect, useRef } from "react";
import LetterState from "../LetterState";
import styles from "./Letter.module.css";

function Letter({ id, updateWord, autofocus, refId, state }) {
  let tabIndex = id === 0 && autofocus ? 1 : -1;
  let [letterValue, setLetter] = useState("");
  let [style, setStyle] = useState(styles.letter);

  let getColor = (state) => {
    if (state === LetterState.GREEN) return `${styles.green}`;
    if (state === LetterState.YELLOW) return `${styles.yellow}`;
    return `${styles.grey}`;
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log("letter style is updated");
    let color = getColor(state);
    setStyle(`${styles.letter} ${color}`);
  }, [state]);

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
      className={style}
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

export default React.memo(Letter);

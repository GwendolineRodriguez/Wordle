import React, { useState, createRef, useEffect, useRef, useMemo } from "react";
import Letter from "./Letter.js";
import styles from "./Word.module.css";

function Word({
  joinedWord,
  wordObj,
  autofocus,
  submitWord,
  refIdFirstLetter,
}) {
  let [word, setWord] = useState(wordObj);

  let letterRefs = useMemo(
    () =>
      new Array(5).fill(null).map((_, i) => {
        if (i === 0) return refIdFirstLetter;
        return createRef();
      }),
    [refIdFirstLetter]
  );
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setWord(() => wordObj.map((item) => item));
  }, [joinedWord, wordObj]);

  let handleWordSubmit = (e) => {
    e.preventDefault();
    submitWord(word);
  };
  let updateWord = (targetId, value) => {
    let letterId = targetId.split("")[0];
    let id = Number.parseInt(letterId);
    setWord((prev) => {
      let newWordValue = prev;
      newWordValue[id].value = value;
      moveToNextLetter(id + 1);
      return newWordValue;
    });
  };

  let moveToNextLetter = (id) => {
    if (id < 5) {
      letterRefs[id].current.focus();
    }
  };
  return (
    <li className={styles.word}>
      <form onSubmit={handleWordSubmit}>
        {word.map((letter, i) => {
          let isFocused = i === 0 && autofocus;
          return (
            <Letter
              idx={letter.id}
              key={letter.id}
              state={letter.state}
              updateWord={updateWord}
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

export default React.memo(Word);

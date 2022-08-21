import React, { useState, createRef, useEffect, useRef } from "react";
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
  // let [letterRefs, setLetterRefs] = useState(
  //   word.map((_, i) => {
  //     if (i === 0) return refIdFirstLetter;
  //     return createRef();
  //   })
  // );
  const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   setLetterRefs(
  //     word.map((_, i) => {
  //       if (i === 0) return refIdFirstLetter;
  //       return createRef();
  //     })
  //   );
  // }, []);
  let letterRefs = word.map((_, i) => {
    if (i === 0) return refIdFirstLetter;
    return createRef();
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setWord(() => wordObj.map((item) => item));
  }, [joinedWord, wordObj]);

  // const letterRefs = useMemo(() => new Array(6).fill(createRef()), []);
  // letterRefs[0] = refIdFirstLetter;

  let handleWordSubmit = (e) => {
    e.preventDefault();
    submitWord(word);
  };
  let updateWord = (targetId, value) => {
    let id = Number.parseInt(targetId);
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
  // console.log("Rerendering", word);
  return (
    <li className={styles.word}>
      <form onSubmit={handleWordSubmit}>
        {word.map((letter, i) => {
          let isFocused = i === 0 && autofocus;
          return (
            <Letter
              id={i}
              key={i}
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

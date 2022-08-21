import React, { useState, useEffect, useCallback } from "react";
import LetterState from "./LetterState.js";

const WordContext = React.createContext({
  wordOfTheDay: "",
  getWordOfTheDay: () => {},
  isWordValid: (submittedWord) => {},
  checkLettersValidity: (word) => {},
  checkIfWordFound: (word) => {},
});

export const WordContextProvider = ({ children }) => {
  let [wordOfTheDay, setWordOfTheDay] = useState("");

  let getWordOfTheDay = useCallback(async () => {
    try {
      let promise = await fetch("https://api.frontendeval.com/fake/word");
      let word = await promise.text();
      setWordOfTheDay(word);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getWordOfTheDay();
  }, [getWordOfTheDay]);

  let isWordValid = async (word) => {
    let submittedWord = word.map((letter) => letter.value).join("");
    let request = { word: submittedWord };
    try {
      const promise = await fetch(
        "https://api.frontendeval.com/fake/word/valid",
        {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return promise.json();
    } catch (error) {
      console.error(error);
    }
  };

  let getLetterState = (letter, idx, wordArray, splitWordOfTheDay) => {
    if (splitWordOfTheDay[idx] === wordArray[idx]) return LetterState.GREEN;
    if (splitWordOfTheDay.includes(letter)) return LetterState.YELLOW;
    return LetterState.GREY;
  };

  let checkLettersValidity = (word, wordOfTheDay) => {
    let splitWordOfTheDay = wordOfTheDay.split("");
    let wordArray = word.map((letter) => letter.value);
    let updatedWord = word.map((letter, i) => {
      let newLetter = {
        value: letter.value,
        state: getLetterState(letter.value, i, wordArray, splitWordOfTheDay),
      };
      return newLetter;
    });
    console.table(updatedWord);
    return updatedWord;
  };

  let checkIfWordFound = (word) => {};

  return (
    <WordContext.Provider
      value={{
        wordOfTheDay: wordOfTheDay,
        currentWordId: 0,
        getWordOfTheDay: getWordOfTheDay,
        isWordValid: isWordValid,
        checkLettersValidity: checkLettersValidity,
        checkIfWordFound: checkIfWordFound,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;

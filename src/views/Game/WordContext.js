import React, { useState, useEffect, useCallback } from "react";

const WordContext = React.createContext({
  wordOfTheDay: "",
  getWordOfTheDay: () => {},
  isWordValid: (submittedWord) => {},
});

export const WordContextProvider = ({ children }) => {
  let [wordOfTheDay, setWordOfTheDay] = useState("");

  let getWordOfTheDay = useCallback(async () => {
    try {
      let promise = await fetch("https://api.frontendeval.com/fake/word");
      let word = await promise.text();
      console.log(word);
      setWordOfTheDay(word);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getWordOfTheDay();
  }, []);

  let isWordValid = async (submittedWord) => {
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
      return await promise.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WordContext.Provider
      value={{
        wordOfTheDay: wordOfTheDay,
        currentWordId: 0,
        getWordOfTheDay: getWordOfTheDay,
        isWordValid: isWordValid,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordContext;

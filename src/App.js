import React, { useState } from "react";
import styles from "./App.module.css";
import Game from "./views/Game/Game.js";
import { WordContextProvider } from "./views/Game/WordContext";
import Instructions from "./views/Instructions/Instructions";

function App() {
  let [showInstructions, setShowInstructions] = useState(false);

  let toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  return (
    <div className={styles.App}>
      {showInstructions && (
        <Instructions toggleInstructions={toggleInstructions}></Instructions>
      )}
      <header className={styles.AppHeader}>
        <h1>Wordle</h1>
        <nav>
          <button onClick={toggleInstructions}>
            <b>?</b>
          </button>
        </nav>
      </header>
      <main className={styles.main}>
        <WordContextProvider>
          <Game></Game>
        </WordContextProvider>
      </main>
    </div>
  );
}

export default App;

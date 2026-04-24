"use client";

//Sarah's Part

import { useEffect, useState } from "react";

export default function Home() {
    const [lyric, setLyric] = useState("");
    const [answer, setAnswer] = useState("");
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [correct, setCorrect] = useState(0);
    const [skips, setSkips] = useState(0);

    async function getLyric() {
        const res = await fetch("/api/lyrics");
        const data = await res.json();

        setLyric(data.lyric);
        setAnswer(data.answer);
        setGuess("");
        setMessage("");
    }

    useEffect(() => {
        getLyric();
    }, []);

    function checkAnswer() {
        if (guess.toLowerCase().trim() === answer.toLowerCase()) {
            setCorrect(correct + 1);
            setMessage("Correct!");
            getLyric();
        } else {
            setMessage("Try again!");
        }
    }

    function skipSong() {
        setSkips(skips + 1);
        setMessage("Skipped!");
        getLyric();
    }

    return (
        <main
            style={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >
            <h1 style={{ marginBottom: "20px" }}>Guess the Song</h1>

            <p style={{ marginBottom: "20px", width: "60%", textAlign: "center" }}>
                {`${lyric}`}
            </p>

            <input
                type="text"
                placeholder="Enter song name"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                style={{
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid gray",
                }}
            />

            <button onClick={checkAnswer} style={{ marginBottom: "10px", padding: "10px" }}>
                Submit
            </button>

            <button onClick={skipSong} style={{ marginBottom: "20px", padding: "10px" }}>
                Skip
            </button>

            <p>{message}</p>

            <p style={{ marginTop: "20px" }}>Correct guesses: {correct}</p>
            <p>Skips: {skips}</p>
        </main>
    );
}
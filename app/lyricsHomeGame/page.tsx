"use client";

//Sarah's Part (main page logic and interface)

import {useEffect, useState} from "react";
import Link from "next/link";

const totalSongs = 20;

export default function Home() {
    const [lyric, setLyric] = useState("");
    const [answer, setAnswer] = useState("");
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [correct, setCorrect] = useState(0);
    const [skips, setSkips] = useState(0);
    const [round, setRound] = useState(1);
    const [done, setDone] = useState(false);

    async function getLyric() { // func to display the chosen random lyric
        const res = await fetch("/api/lyrics");
        const data = await res.json();

        setLyric(data.lyric);
        setAnswer(data.answer);
        setGuess("");
    }

    useEffect(() => {
        getLyric();
    }, []);

    function nextSong() {
        if (round >= totalSongs) {
            setDone(true);
        } else {
            setRound(round + 1);
            getLyric();
        }
    }

    function checkAnswer() { //func to see if the inputted answer is right
        if (guess.toLowerCase().trim() === answer.toLowerCase().trim()) {
            setCorrect(correct + 1); //tally
            setMessage("Correct!");
        } else {
            setMessage(`Incorrect sorry! The answer was ${answer}`);
        }

        setTimeout(() => {
            setMessage("");
            nextSong();
        }, 1500);
    }

    function skipSong() {
        setSkips(skips + 1);
        setMessage(`Skipped! The answer was ${answer}`);

        setTimeout(() => {
            setMessage("");
            nextSong();
        }, 1500);
    }

    function restartGame() {
        setCorrect(0);
        setSkips(0);
        setRound(1);
        setDone(false);
        setMessage("");
        getLyric();
    }

    if (done) {
        return (
            <main
                style={{
                    width: "100vw",
                    margin: "0",
                    backgroundImage: "linear-gradient(to bottom, #ccdcff, #b3beff, #9a99f2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    fontFamily: "monospace",
                    textAlign: "center",
                }}
            >
                <section
                    style={{
                        backgroundColor: "#e6f2ff",
                        padding: "3%",
                        borderRadius: "20px",
                        border: "10px double #b3beff",
                        maxWidth: "60%",
                        boxShadow:
                            "0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                >
                    <h1>Game Over!</h1>

                    <h2>
                        Final Score: {correct}/{totalSongs}
                    </h2>

                    <p>You skipped {skips} songs.</p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "15px",
                            marginTop: "20px",
                        }}
                    >
                        <button
                            onClick={restartGame}
                            style={{
                                backgroundColor: "#b3beff",
                                padding: "10px 20px",
                                borderRadius: "15px",
                                border: "none",
                                fontFamily: "monospace",
                            }}
                        >
                            Play Again
                        </button>
                    </div>

                    <Link
                        href="/"
                        style={{
                            textDecoration: "none",
                            color: "black",
                            backgroundColor: "#b3beff",
                            padding: "10px 20px",
                            borderRadius: "15px",
                            display: "inline-block",
                            marginTop: "20px",
                        }}
                    >
                        Back Home
                    </Link>
                </section>
            </main>
        );
    }

    return ( //my html part + styling inspired by mia
        <main
            style={{
                width: "100vw",
                margin: "0",
                backgroundImage: "linear-gradient(to bottom, #ccdcff, #b3beff, #9a99f2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                fontFamily: "monospace",
                textAlign: "center",
            }}
        >
            <section
                style={{
                    backgroundColor: "#e6f2ff",
                    padding: "3%",
                    borderRadius: "20px",
                    border: "10px double #b3beff",
                    maxWidth: "60%",
                    boxShadow:
                        "0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
            >
                <h1>Guess the Song</h1>

                <h2>
                    Song {round} / {totalSongs}
                </h2>

                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "15px",
                        padding: "20px",
                        margin: "20px auto",
                    }}
                >
                    <p>"{lyric}"</p>
                </div>

                <input
                    type="text"
                    placeholder="Enter song name"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "15px",
                        border: "2px solid #b3beff",
                        width: "70%",
                        marginBottom: "20px",
                        fontFamily: "monospace",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        marginBottom: "20px",
                    }}
                >
                    <button
                        onClick={checkAnswer}
                        style={{
                            backgroundColor: "#b3beff",
                            padding: "10px 20px",
                            borderRadius: "15px",
                            border: "none",
                            fontFamily: "monospace",
                        }}
                    >
                        Submit
                    </button>

                    <button
                        onClick={skipSong}
                        style={{
                            backgroundColor: "#b3beff",
                            padding: "10px 20px",
                            borderRadius: "15px",
                            border: "none",
                            fontFamily: "monospace",
                        }}
                    >
                        Skip
                    </button>
                </div>

                <h2>{message}</h2>

                <div>
                    <p>Correct guesses: {correct}</p>
                    <p>Skips: {skips}</p>
                </div>

                <Link
                    href="/"
                    style={{
                        textDecoration: "none",
                        color: "black",
                        backgroundColor: "#b3beff",
                        padding: "10px 20px",
                        borderRadius: "15px",
                        display: "inline-block",
                        marginTop: "20px",
                    }}
                >
                    Back Home
                </Link>
            </section>
        </main>
    );
}
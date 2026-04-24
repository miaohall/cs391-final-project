import { NextResponse } from "next/server";

//Sarah's part
const songs = [
    { track: "Firework", artist: "Katy Perry" },
    { track: "Sorry", artist: "Justin Bieber" },
    { track: "Halo", artist: "Beyonce" },

    { track: "Blinding Lights", artist: "The Weeknd" },
    { track: "Shape of You", artist: "Ed Sheeran" },
    { track: "Rolling in the Deep", artist: "Adele" },
    { track: "Uptown Funk", artist: "Mark Ronson" },
    { track: "Closer", artist: "The Chainsmokers" },
    { track: "Stay", artist: "Rihanna" },
    { track: "Love Yourself", artist: "Justin Bieber" },
];

export async function GET() {
    const random = songs[Math.floor(Math.random() * songs.length)];

    try {
        const res = await fetch(
            `https://api.lyrics.ovh/v1/${random.artist}/${random.track}`
        );

        const data = await res.json();

        return NextResponse.json({
            lyric: data.lyrics ? data.lyrics.split("\n")[0] : "No lyric found",
            answer: random.track,
        });
    } catch (err) {
        return NextResponse.json({
            lyric: "Error loading lyric",
            answer: random.track,
        });
    }
}
import { NextResponse } from "next/server";

//Sarah's part (just 'api' for my lyric game)

const songs = [ //song array
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

    { track: "Bad Romance", artist: "Lady Gaga" },
    { track: "Counting Stars", artist: "OneRepublic" },
    { track: "Senorita", artist: "Shawn Mendes" },
    { track: "Roar", artist: "Katy Perry" },
    { track: "Someone Like You", artist: "Adele" },
    { track: "Levitating", artist: "Dua Lipa" },
    { track: "As It Was", artist: "Harry Styles" },
    { track: "Happy", artist: "Pharrell Williams" },
    { track: "Perfect", artist: "Ed Sheeran" },
    { track: "Umbrella", artist: "Rihanna" },
];

function pickLine(lyrics: string) {
    const lines = lyrics.split("\n").filter((line) => {
        const fixedLine = line.trim().toLowerCase();

        return ( // this was to fix the problem i had in class where the lyric was just 'yeah' and every single song has that.
            fixedLine.length > 25 &&
            fixedLine.split(" ").length > 5 &&
            fixedLine !== "yeah" &&
            fixedLine !== "oh" &&
            fixedLine !== "baby" &&
            fixedLine !== "la la la" &&
            !fixedLine.includes("[") &&
            !fixedLine.includes("]")
        );
    });

    if (lines.length === 0) {
        return "No appropriate lyric found";
    }

    return lines[Math.floor(Math.random() * lines.length)];
}

export async function GET() {
    const random = songs[Math.floor(Math.random() * songs.length)];

    try {
        const res = await fetch( //fetching from lyric api
            `https://api.lyrics.ovh/v1/${random.artist}/${random.track}`
        );

        const data = await res.json();

        return NextResponse.json({
            lyric: data.lyrics ? pickLine(data.lyrics) : "No lyric found",
            answer: random.track,
        });
    } catch (err) {
        return NextResponse.json({
            lyric: "Error loading lyric",
            answer: random.track,
        });
    }
}
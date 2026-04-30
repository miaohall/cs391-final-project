"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import SongCard, { Song } from "./SongCard";

/*
  Component: Playlist
  Responsible for: Emily Goyal
  Logic:
  - fetches songs based on the selected mood
  - shuffles the results so the playlist feels different each time
  - lets the user refresh the playlist without choosing a new mood
*/

interface Props {
    mood: string;
}

const moodMap: Record<string, string[]> = {
    happy: ["upbeat pop hits", "feel good songs", "dance pop"],
    sad: ["emotional songs", "sad piano", "heartbreak songs", "slow ballads"],
    chill: ["lofi chill beats", "relaxing music", "ambient chill"],
    workout: ["gym music", "high energy songs", "EDM workout", "rap workout"],
    focus: ["study music", "instrumental focus", "deep focus", "classical study"],
};

const Section = styled.div`
    width: min(95vw, 1300px);
    margin: 0 auto;
    padding: clamp(16px, 4vw, 40px);
    box-sizing: border-box;
`;

const TopRow = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const RefreshButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 999px;

    background: #222;
    color: white;
    cursor: pointer;
    font-size: clamp(14px, 1.5vw, 18px);

    &:hover {
        opacity: 0.9;
    }
`;

const Message = styled.p`
    text-align: center;
    color: #444;
    font-size: 16px;
    margin: 24px 0;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: clamp(16px, 3vw, 32px);
`;

function shuffleSongs(array: Song[]): Song[] {
    const copied = [...array];

    for (let i = copied.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copied[i], copied[j]] = [copied[j], copied[i]];
    }

    return copied;
}

export default function Playlist({ mood }: Props) {
    const [allSongs, setAllSongs] = useState<Song[]>([]);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const generatePlaylist = (list: Song[]) => {
        const shuffled = shuffleSongs(list);
        setSongs(shuffled.slice(0, 10));
    };

    useEffect(() => {
        if (!mood) {
            setAllSongs([]);
            setSongs([]);
            return;
        }

        async function fetchSongs() {
            try {
                setLoading(true);

                const options = moodMap[mood] || [mood];
                const randomSearch =
                    options[Math.floor(Math.random() * options.length)];

                const res = await fetch(
                    `https://itunes.apple.com/search?term=${encodeURIComponent(
                        randomSearch
                    )}&media=music&entity=song&limit=50`
                );

                const data = await res.json();
                const results: Song[] = data.results || [];

                const filtered = results.filter(
                    (song) =>
                        song.trackName &&
                        !song.trackName.toLowerCase().includes(mood.toLowerCase())
                );

                setAllSongs(filtered);
                generatePlaylist(filtered);
            } catch (err) {
                console.error("Error fetching songs:", err);
                setAllSongs([]);
                setSongs([]);
            } finally {
                setLoading(false);
            }
        }

        fetchSongs();
    }, [mood]);

    const handleRefresh = () => {
        generatePlaylist(allSongs);
    };

    return (
        <Section>
            {!mood && <Message>Select a mood to get songs.</Message>}

            {loading && (
                <TopRow>
                    <Message>Loading songs for {mood}...</Message>
                </TopRow>
            )}

            {!loading && songs.length > 0 && (
                <>
                    <TopRow>
                        <RefreshButton onClick={handleRefresh}>
                            Refresh Playlist
                        </RefreshButton>
                    </TopRow>

                    <Grid>
                        {songs.map((song) => (
                            <SongCard key={song.trackId} song={song} />
                        ))}
                    </Grid>
                </>
            )}

            {!loading && mood && songs.length === 0 && (
                <Message>No songs found.</Message>
            )}
        </Section>
    );
}
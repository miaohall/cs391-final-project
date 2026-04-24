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
  - allows the user to refresh the displayed playlist without choosing a new mood
*/

interface Props {
    mood: string;
}

const moodMap: Record<string, string[]> = {
    happy: [
        "upbeat pop hits",
        "feel good songs",
        "summer vibes",
        "dance pop",
    ],
    sad: [
        "emotional songs",
        "sad piano",
        "heartbreak songs",
        "slow ballads",
    ],
    chill: [
        "lofi chill beats",
        "relaxing music",
        "ambient chill",
        "acoustic vibes",
    ],
    workout: [
        "gym music",
        "high energy songs",
        "EDM workout",
        "rap workout",
    ],
    focus: [
        "study music",
        "instrumental focus",
        "deep focus",
        "classical study",
    ],
};

const Section = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const RefreshButton = styled.button`
  padding: 0.75rem 1.2rem;
  border: none;
  border-radius: 999px;
  background: #222;
  color: white;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #666;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

function shuffleSongs(array: Song[]): Song[] {
    const copiedArray = [...array];

    for (let i = copiedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }

    return copiedArray;
}

export default function Playlist({ mood }: Props) {
    const [allSongs, setAllSongs] = useState<Song[]>([]);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const generateRandomPlaylist = (songList: Song[]) => {
        const shuffled = shuffleSongs(songList);
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
                const fetchedSongs: Song[] = data.results || [];

                const filteredSongs = fetchedSongs.filter(
                    (song) =>
                        song.trackName &&
                        !song.trackName.toLowerCase().includes(mood.toLowerCase())
                );

                setAllSongs(filteredSongs);
                generateRandomPlaylist(filteredSongs);

            } catch (error) {
                console.error("Error fetching songs:", error);
                setAllSongs([]);
                setSongs([]);
            } finally {
                setLoading(false);
            }
        }

        fetchSongs();
    }, [mood]);

    const handleRefresh = () => {
        generateRandomPlaylist(allSongs);
    };

    if (!mood) {
        return <Message>Select a mood to get songs.</Message>;
    }

    if (loading) {
        return <Message>Loading songs for "{mood}"...</Message>;
    }

    if (songs.length === 0) {
        return <Message>No songs found for "{mood}".</Message>;
    }

    return (
        <Section>
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
        </Section>
    );
}
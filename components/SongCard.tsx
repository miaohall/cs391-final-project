import styled from "styled-components";

/*
  Component: SongCard
  Responsible for: Emily Goyal
*/

export interface Song {
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName: string;
    artworkUrl100: string;
    previewUrl?: string;
}

interface Props {
    song: Song;
}

const Card = styled.div`
    padding: 1%;
    margin: 1%;
    border-radius: 12px;
    text-align: center;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
`;

export default function SongCard({ song }: Props) {
    return (
        <Card>
            <Img
                src={song.artworkUrl100.replace("100x100", "600x600")}
                alt={song.trackName}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = song.artworkUrl100;
                }}
            />
            <h3>{song.trackName}</h3>
            <p>{song.artistName}</p>
            <p>{song.collectionName}</p>
            {song.previewUrl && (
                <audio controls>
                    <source src={song.previewUrl} type="audio/mpeg" />
                </audio>
            )}
        </Card>
    );
}
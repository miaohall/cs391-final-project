import styled from "styled-components";

/*
  Component: SongCard
  Responsible for: Emily Goyal
  Logic: displays one song with its album image, details, and audio preview
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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2% 3%;
    width: 100%;
    min-width: 0;
    padding: 16px;
    box-sizing: border-box;
    text-align: center;
`;

const Img = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    object-fit: cover;
`;

const Title = styled.h3`
    margin: 12px 0 4px;
    font-size: calc(2px + 1.2vw);
    padding: 2%;
    word-break: break-word;
`;

const Text = styled.p`
    margin: 2px 0;
    font-size: calc(2px + 1.1vw);
    padding: 1%;
    word-break: break-word;
`;

const Audio = styled.audio`
    width: 100%;
    margin-top: auto;
    padding-top: 12px;
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

            <Title>{song.trackName}</Title>
            <Text>{song.artistName}</Text>
            <Text>{song.collectionName}</Text>

            {song.previewUrl && (
                <Audio controls>
                    <source src={song.previewUrl} type="audio/mpeg" />
                </Audio>
            )}
        </Card>
    );
}
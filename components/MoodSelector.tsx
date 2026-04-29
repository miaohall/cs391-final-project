import styled from "styled-components";

/*
  Component: MoodSelector
  Responsible for: Emily Goyal
  Logic: lets the user select a mood
*/

interface Props {
    setMood: (mood: string) => void;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    gap: 16px;
    max-width: 600px;
    margin: 30px auto;
    padding: 0 16px;
`;

const Button = styled.button`
    padding: 2% 3%;
    border-radius: 999px;
    border: none;

    background: black;
    color: white;
    cursor: pointer;
    font-size: calc(2px + 1.3vw);

    &:hover {
        opacity: 0.9;
    }
`;

export default function MoodSelector({ setMood }: Props) {
    const moods = ["happy", "sad", "chill", "workout", "focus"];

    return (
        <Container>
            {moods.map((mood) => (
                <Button key={mood} onClick={() => setMood(mood)}>
                    {mood}
                </Button>
            ))}
        </Container>
    );
}
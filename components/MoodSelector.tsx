import styled from "styled-components";

/*
  Component: MoodSelector
  Responsible for: Emily Goyal
  Logic: lets user pick a mood
*/

interface Props {
    setMood: (mood: string) => void;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 2%;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  background: black;
  color: white;
  cursor: pointer;
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
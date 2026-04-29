import styled from "styled-components";
import Link from "next/link";

//Section made by Mia O'Halloran
//app home page

const StyledDiv = styled.div`
    margin: 0 auto;
    background-image: linear-gradient(to bottom, #ccdcff, #b3beff, #9a99f2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: monospace;
`;

const AllBoxes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const StyledBox = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    background-color: #e6f2ff;
    align-items: center;
    padding: 1%;
    border-radius: 20px;
    border: 10px double #b3beff;
    width: 30%;
    height: 70%;
    margin: 4% 1.5%;
    box-shadow:0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;


const StyledButton = styled(Link)`
    text-decoration: none;
    color: black;
    background-color: #b3beff;
    padding: 4% 10%;
    margin: 10%;
    border-radius: 15px;
    font-size: calc(2px + 1.1vw);
    
    &:hover {
        background-color: white;
    }
`;


export default function Home() {

    return (
        <StyledDiv>
            <h1>Welcome to our music app!</h1>
            <br/><br/>
            <h2>Choose below from 3 different features:</h2>
            <br/> <br/><br/>
            <AllBoxes>
                <StyledBox>
                    <h2>Feature 1:</h2><br/><br/>
                    <h2>Discover songs based off your mood!</h2>
                    <StyledButton href="/moodHomeGame">Check out now</StyledButton>
                </StyledBox>
                <StyledBox>
                    <h2>Feature 2:</h2><br/><br/>
                    <h2>Find radio stations in your country and make a favorites list!</h2>
                    <StyledButton href="/radioHomeGame">Check out now</StyledButton>
                </StyledBox>
                <StyledBox>
                    <h2>Feature 3:</h2><br/><br/>
                    <h2>Guess the song from the lyric!</h2>
                    <StyledButton href="/lyricsHomeGame">Check out now</StyledButton>
                </StyledBox>
            </AllBoxes>
        </StyledDiv>
    );
}

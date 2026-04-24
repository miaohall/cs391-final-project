"use client";

import { useState } from "react";
import styled from "styled-components";
import MoodSelector from "../../components/MoodSelector";
import Playlist from "../../components/Playlist";

/*
  Page: Home
  Responsible for: Emily Goyal
  Logic: manages selected mood and passes it to components
*/

//NOTE - height still needs to be fixed
const Wrapper = styled.div`
    font-family: monospace;
    width: 85vw;
    margin: 0 auto;
    height: 210vh;
    background-image: linear-gradient(to bottom, #ccdcff, #b3beff, #9a99f2);
`;

const Title = styled.h1`
    text-align: center;
`;

export default function Home() {
    const [mood, setMood] = useState<string>("");

    return (
        <Wrapper>
            <Title>MoodMix 🎵</Title>

            <MoodSelector setMood={setMood} />
            <Playlist mood={mood} />
        </Wrapper>
    );
}
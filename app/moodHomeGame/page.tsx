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

const Wrapper = styled.div`
    font-family: monospace;
    height: 100vh;
    margin: 0;
    padding-bottom: 40px;
    box-sizing: border-box;
    background-image: linear-gradient(to bottom, #ccdcff, #b3beff, #9a99f2);
    overflow-x: hidden;
`;

const Title = styled.h1`
    text-align: center;
    margin: 0;
    padding-top: 40px;
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
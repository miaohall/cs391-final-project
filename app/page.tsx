"use client";

import styled from "styled-components";
import {useState} from "react";
import Link from "next/link";

//HOME PAGE??

export default function Home() {
    const [something, setSomething] = useState("");

    return (
        <StyledDiv>
            <h1>Pick a Game!</h1>
            <br/> <br/><br/>
            <StyledBox>
                <StyledButton href={`/${something}`}>Game 1</StyledButton>
            </StyledBox>
            <StyledBox>
                <StyledButton href={`/${something}`}>Game 2</StyledButton>
            </StyledBox>
            <StyledBox>
                <StyledButton href={`/${something}`}>Game 3</StyledButton>
            </StyledBox>
        </StyledDiv>
    );
}

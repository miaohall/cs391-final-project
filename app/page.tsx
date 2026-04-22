"use client";

import styled from "styled-components";
import {useState} from "react";
import Link from "next/link";

export default function Home() {
    const [something, setSomething] = useState("");

    return (
        <StyledDiv>
            <StyledBox>
                <h1>text</h1>
                <StyledInput type="text" value={something} onChange={(e) => setSomething(e.target.value)}/>
                <br/> <br/><br/>
                <StyledButton href={`/${something}`}>Something</StyledButton>
            </StyledBox>
        </StyledDiv>
    );
}

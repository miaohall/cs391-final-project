"use client";

import styled from "styled-components";
import {useState} from "react";
import Link from "next/link";

//Section made by Mia O'Halloran

//home page for radio station feature

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

const StyledBox = styled.div`
    text-align: center;
    background-color: #e6f2ff;
    color: black;
    font-size: calc(2px + 1.6vw);
    padding: 4%;
    border-radius: 20px;
    border: 10px double #b3beff;
    margin-left: 10%;
    margin-right: 10%;
    box-shadow:0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const StyledInput = styled.input`
    margin-top: 3%;
    font-size: calc(2px + 1.6vw);
    max-width: 50%;
`;

const StyledButton = styled(Link)`
    text-decoration: none;
    background-color: #b3beff;
    padding: 2% 15%;
    border-radius: 15px;
    border: none;
    font-size: calc(2px + 1.7vw);
    
    &:hover {
        background-color: white;
    }
`;

export default function Home() {
    const [countrycode, setCountrycode] = useState("");

    return (
        <StyledDiv>
            <StyledBox>
                <h1>Find your favorite radio stations!</h1><br/><br/>
                <p>Enter a country by country code (for example, US, CA, GB):</p>
                <StyledInput type="text" value={countrycode} onChange={(e) => setCountrycode(e.target.value)}/>
                <br/> <br/><br/>
                <StyledButton href={`/${countrycode}`}>Get Stations</StyledButton>
            </StyledBox>
        </StyledDiv>
    );
}

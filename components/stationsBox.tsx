import styled from "styled-components";
import {Station} from "@/app/interfaces/station";

//Section made by Mia O'Halloran

const StationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: monospace;
    margin: 2% 1%;
    padding: 1%;
    max-width: 28%;
    background-color: #e6f2ff;
    border: 5px solid white;
    border-radius: 10px;
    box-shadow:0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    overflow: hidden; 
    word-break: break-word;
    
    @media screen and (max-width: 1000px) {
        border-radius: 8px;
        max-width: 85%;
        padding: 4%
    }
`;

const StyledSubtext = styled.p`
    font-size: calc(2px + 1.4vw);
    padding: 3.5%;
`;

const FavButton=styled.button`
    background-color: #60308c;
    font-family: monospace;
    color: white;
    padding: 3.5% 5%;
    margin: 4.5%;
    border-radius: 10px;
    border: none;
    font-size: calc(2px + 1.4vw);

    &:hover {
        background-color: white;
        color: #60308c;
    }
`;


export default function StationsBox(props: Station & {isFav: boolean, onFavClick: () => void}) {
    return(
        <StationWrapper>
            <h2>Station: {props.name}</h2>
            <StyledSubtext><strong>Region:</strong> {props.state}</StyledSubtext>
            <StyledSubtext><strong>Tags:</strong> {props.tags}</StyledSubtext>
            <StyledSubtext><strong>Language:</strong> {props.language}</StyledSubtext>
            <StyledSubtext>
                <a href={props.url_resolved}><strong>Listen now!</strong></a>
                </StyledSubtext>
            <FavButton onClick={props.onFavClick}>
                {props.isFav ? "Remove from favorites" : "Add to favorites"}
            </FavButton>
        </StationWrapper>
    );
}
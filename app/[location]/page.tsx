"use client";

import {useParams} from "next/navigation";
import useSWR from "swr";
import StationsBox from "@/components/stationsBox";
import styled from "styled-components";
import {Station} from "@/app/interfaces/station";
import {useState} from "react";

//section made by Mia O'Halloran

const RadioWrapper = styled.div`
    width: 80vw;
    margin: 0 auto;
    box-sizing: border-box;
    background-image: linear-gradient(to bottom, #ccdcff, #b3beff, #9a99f2);
    font-family: monospace;
`;

const LocName = styled.div`
    font-size: calc(2px + 6vw);
    text-align: center;
`;

const RadioBoxsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
`;

const FavsWrapper = styled.div`
    align-items: center;
    font-size: calc(2px + 1.5vw);
    background-color: white;
    border: 5px solid white;
    border-radius: 10px;
    box-shadow:0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 4% 7%;
    padding: 1% 4%;
`;

export default function LocationPage() {
    const params = useParams();
    const [favs, setFavs] = useState<Station[]>([]);

    const {data, error} = useSWR(`/api/getStationData?countrycode=${params.location}`, (url: string) =>
        fetch(url)
            .then((res) => res.json())
    );

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    //sort stations by most popular
    const datas = Array.isArray(data) ? [...data].sort((a, b) => b.votes - a.votes) : [];

    //toggle function for adding/removing stations from favorites list
    function handleFavClick(station: Station) {
        setFavs(prev =>
        prev.some(s=> s.stationuuid === station.stationuuid)
            ? prev.filter(s => s.stationuuid !== station.stationuuid)
            : [...prev, station]
        );
    }

    return (
        <RadioWrapper>
            <LocName>{params.location} Stations</LocName>

            <FavsWrapper>
                <h2>Favorites:</h2>
                <p>{favs.map((station: Station, index: number) => (
                    <span key={station.stationuuid}>
                        <a href={station.url_resolved} target="_blank">{station.name}</a>
                        {index < favs.length - 1 ? ", " : ""}</span>))}
                </p>
            </FavsWrapper>
            <RadioBoxsContainer>
                {
                    datas.map((station: Station) =>
                        (
                            <StationsBox
                                key={station.stationuuid}
                                stationuuid={station.stationuuid}
                                name={station.name}
                                tags={station.tags}
                                countrycode={station.countrycode}
                                state={station.state}
                                language={station.language}
                                votes={station.votes}
                                url={station.url}
                                url_resolved={station.url_resolved}
                                isFav={favs.some(s => s.stationuuid === station.stationuuid)}
                                onFavClick = {() => handleFavClick(station)}
                            />
                        )
                    )
                }
            </RadioBoxsContainer>
        </RadioWrapper>
    );
}
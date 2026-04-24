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
    color: black;
    font-size: calc(2px + 1.5vw);
    background-color: white;
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
                <p>{favs.map(s => s.name).join(", ")}</p>
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
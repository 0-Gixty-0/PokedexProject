"use client"
import {useEffect, useState} from "react";
import {capitalizeFirstLetter} from "@/app/utils/stringManipulation";

interface Props {
    url: string;
}

interface Move {
    name: string;
    type: {
        name: string;
    };
    accuracy: number;
    effect_chance: number;
    pp: number;
    power: number;
}

type DataEntry = null | Move;

export default function PokemonMoveCard(props: Props) {
    const [data, setData] = useState<DataEntry>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true);
        fetch(props.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch move");
                }
                return response.json();
            })
            .then(fetchedData => {
                setData(fetchedData);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(()=> {
                setIsLoading(false);
            });
    }, [props.url])

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>This is the error: {error}</p>;
    if (!data) return null;

    return (
        <>
        <h4>{data.name}</h4>
            {data.power != null
                ? <p>Base power: {data.power}</p>
                : <p>Base power: --</p>
            }
            <p>Type: {capitalizeFirstLetter(data.type.name)}</p>
            <p>Accuracy: {data.accuracy}</p>
            {data.effect_chance != null
                ? <p>Move effect chance: {data.effect_chance}%</p>
                : <p>Move effect chance: --</p>
            }
            <p>Power points: {data.pp}</p>
        </>
    )
}
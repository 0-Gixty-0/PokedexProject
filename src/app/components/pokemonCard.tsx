"use client"
import {useEffect, useState} from "react";
import {capitalizeFirstLetter} from "../utils/stringManipulation"
import PokemonAbilityCard from "@/app/components/pokemonAbilityCard";
import PokemonMoveCard from "@/app/components/pokemonMoveCard";

interface DisplayDataProps {
    url : string;
}

interface Ability {
    ability: {
        name: string;
        url: string;
    };
}

interface Move {
    move: {
        name: string;
        url: string;
    };
}

export default function PokemonCard(Props: DisplayDataProps) {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        setIsLoading(true);
        fetch(Props.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch pokemon");
                }
                return response.json();
            })
            .then(fetchedData => {
                setData(fetchedData);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }, [Props.url])

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>This is the error: {error}</p>;
    if (!data) return null;

    const abilitiesList = data.abilities.map((ability: Ability) =>
        <li>
            <PokemonAbilityCard
                name={capitalizeFirstLetter(ability.ability.name)}
                url={ability.ability.url}>
            </PokemonAbilityCard>
        </li>)

    const movesList = data.moves.map((move: Move) =>
        <li>
            <PokemonMoveCard url={move.move.url}></PokemonMoveCard>
        </li>)

    return (
        <div>
            <h2>Fetched Pokemon {capitalizeFirstLetter(data.name)}</h2>
            <h3>Abilities:</h3>
            <ul>{abilitiesList}</ul>
            <h3>Moves:</h3>
            <ul>{movesList}</ul>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

"use client"
import {useEffect, useState} from "react";
import {capitalizeFirstLetter} from "../utils/stringManipulation"
import PokemonAbilityCard from "@/app/components/pokemonAbilityCard";
import PokemonMoveCard from "@/app/components/pokemonMoveCard";

interface DisplayDataProps {
    url : string;
}

// interface Ability {
//     ability: {
//         name: string;
//         url: string;
//     };
// }
//
// interface Move {
//     move: {
//         name: string;
//         url: string;
//     };
// }

interface TypeEntry {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

interface BasicPokemonEntry {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    types: TypeEntry[];
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
}

type DataEntry = null | BasicPokemonEntry;

export default function PokemonCard(Props: DisplayDataProps) {
    const [data, setData] = useState<DataEntry>(null)
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

    // const abilitiesList = data.abilities.map((ability: Ability) =>
    //     <li>
    //         <PokemonAbilityCard
    //             name={capitalizeFirstLetter(ability.ability.name)}
    //             url={ability.ability.url}>
    //         </PokemonAbilityCard>
    //     </li>)
    //
    // const movesList = data.moves.map((move: Move) =>
    //     <li>
    //         <PokemonMoveCard url={move.move.url}></PokemonMoveCard>
    //     </li>)

    const types = data.types.map((entry: TypeEntry) =>
    <li><p>{capitalizeFirstLetter(entry.type.name)}</p></li>)

    return (
        <div>
            <h2>Fetched Pokemon: {capitalizeFirstLetter(data.name)}</h2>
            <img src={data.sprites.other["official-artwork"].front_default} alt={"official artwork"}/>
            <p>Type:</p>
            <ul>{types}</ul>
            <p>Height: {data.height} dm</p>
            <p>Weight: {data.weight} hg</p>
            <p>Base experience yield: {data.base_experience}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

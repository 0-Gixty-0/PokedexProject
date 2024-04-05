"use client"
import {useEffect, useState} from "react";

interface Props {
    name: string
    url: string;
}

interface EffectEntry {
    effect: string;
    language: {
        name: string;
        url: string;
    };
    short_effect: string;
}

export default function PokemonAbilityCard(props: Props) {
    const [data, setData] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true);
        fetch(props.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch ability text");
                }
                return response.json();
            })
            .then(fetchedData => {
                const englishEffectEntry = fetchedData.effect_entries.filter((entry: EffectEntry) =>
                    entry.language.name == "en"
                );
                setData(englishEffectEntry[0].effect);
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
            <h4>{props.name}</h4>
            <p>{data}</p>
        </>
    )
}
"use client"
import {useEffect, useState} from "react";

interface DisplayDataProps {
    url : string;
}

export default function PokemonCard(Props: DisplayDataProps) {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        console.log("is updating now")
        console.log(Props.url)
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
    if (error) return <p>Error: {error}</p>;
    if (!data) return null;

    return (
        <div>
            <h2>Fetched Pokemon</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

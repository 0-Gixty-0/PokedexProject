"use client"

import React, { useState } from 'react';
import styles from "./page.module.css";
import ShowPokemonButton from "./components/showPokemonButton"
import PokemonCard from "@/app/components/pokemonCard";

export default function Home() {
    const [url, setUrl] = useState<string>("");

    const handleFetchData = (url: string) => {
        console.log(url);
        setUrl(url);
    }
    
    return (
        <div className={styles.pageFrame}>
            <h2 className={styles.center}>Please press the button to show Squirtle!</h2>
            <ShowPokemonButton title={"Show Ditto"} onClick={handleFetchData} url={'https://pokeapi.co/api/v2/pokemon/ditto'}/>
            <ShowPokemonButton title={"Show Squirtle"} onClick={handleFetchData} url={'https://pokeapi.co/api/v2/pokemon/squirtle'}/>
            <PokemonCard url={url}/>
        </div>
    );
}

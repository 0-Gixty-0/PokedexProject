"use client"

interface ButtonProps {
    url: string;
    title : string;
    onClick: (url : string) => void
}
export default function ShowPokemonButton(Props: ButtonProps) {
    return (
        <button onClick={() => Props.onClick(Props.url)}>{Props.title}</button>
    );
}
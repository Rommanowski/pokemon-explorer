import { useEffect, useState } from "react";
import type { Pokemon, PokeListItem} from "../types/pokemon.ts";
import { PokemonTile } from "./PokemonTile.tsx";
import { SearchBar } from "./SearchBar.tsx";
import { Header } from "./Header.tsx";


export const MainPage = () => {

    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
    const [visiblePokemon, setVisiblePokemon] = useState<Pokemon[]>([]);
    const [searchValue, setSearchValue] = useState<string>("")

    useEffect(() => {
        const fetchAll = async () => {
            const res = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=50"
            );
            const data: { results: PokeListItem[] } = await res.json();

            const fullPokemon: Pokemon[] = await Promise.all(
                data.results.map(async (p) => {
                    const detailRes = await fetch(p.url);
                    const detail = await detailRes.json();

                    return {
                        id: detail.id,
                        name: detail.name,
                        image: detail.sprites.front_default,
                        types: detail.types.map((t) => t.type.name),
                    };
                })
            );

            const visiblePokemon = fullPokemon.filter((p) =>
                p.name.toLowerCase().includes(searchValue.toLowerCase())
            );

            setVisiblePokemon(visiblePokemon)
        };

        fetchAll();
    }, [searchValue]);

    return (
        <div className="w-full h-full bg-[#121212] text-white">

            <Header/>

            <SearchBar
                onSearch={(value) => {
                    setSearchValue(value);
                }}
            />

            {visiblePokemon.map((p) => (
                <PokemonTile key={p.id} id={p.id} name={p.name} image={p.image} types={p.types}/>
            ))}
        </div>
    )
}
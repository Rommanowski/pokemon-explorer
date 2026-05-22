import { useEffect, useState } from "react";
import type { Pokemon, PokeListItem } from "../types/pokemon.ts";
import { PokemonTile } from "./PokemonTile.tsx";
import { SearchBar } from "./SearchBar.tsx";
import { Header } from "./Header.tsx";

export const MainPage = () => {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const limit = 24;

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=2000"
                );
                const data: { results: PokeListItem[] } = await res.json();

                const fullPokemon: Pokemon[] = await Promise.all(
                    data.results.map(async (p) => {
                        const detailRes = await fetch(p.url);
                        const detail = await detailRes.json();

                        return {
                            id: detail.id,
                            name: detail.name,
                            image: detail.sprites.other["official-artwork"].front_default,
                            types: detail.types.map((t: any) => t.type.name),
                        };
                    })
                );

                setAllPokemon(fullPokemon);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const filteredPokemon = allPokemon.filter((p) =>
        p.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const visiblePokemon = filteredPokemon.slice(0, page * limit);


    const handleLoadMore = () => {
        setLoading(true);

        setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
        }, 600);
    };

    return (
        <div className="min-h-screen w-full bg-[#121212] text-white">
            <Header />

            <SearchBar
                onSearch={(value) => {
                    setSearchValue(value);
                    setPage(1);
                }}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 mx-48">
                {visiblePokemon.map((p) => (
                    <PokemonTile
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        image={p.image}
                        types={p.types}
                    />
                ))}
            </div>

            <div className="flex justify-center pb-8">
                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : (
                    visiblePokemon.length < filteredPokemon.length && (
                        <button
                            onClick={handleLoadMore}
                            className="px-4 py-2 bg-orange-500 rounded-xl hover:bg-orange-600"
                        >
                            Load more
                        </button>
                    )
                )}
            </div>
        </div>
    );
};
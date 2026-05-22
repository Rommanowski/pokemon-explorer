import { useEffect, useState } from "react";
import type { Pokemon, PokeListItem } from "../types/pokemon.ts";
import { PokemonTile } from "./PokemonTile.tsx";
import { SearchBar } from "./SearchBar.tsx";
import { Header } from "./Header.tsx";
import { TypeFilter } from "./TypeFilter.tsx";
import { LoadButton } from "./LoadButton.tsx";

export const MainPage = () => {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
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

    const filteredPokemon = allPokemon.filter((p) => {
        const matchesName = p.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        const matchesType =
            selectedTypes.length === 0 ||
            p.types.some((t) => selectedTypes.includes(t));
        return matchesName && matchesType;
    });

    const toggleType = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
        setPage(1);
    };

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

            <TypeFilter selectedTypes={selectedTypes} onToggle={toggleType} />

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


            <LoadButton loading={loading} handleLoadMore={handleLoadMore} areMorePokemon={visiblePokemon.length < filteredPokemon.length}/>
        </div>
    );
};
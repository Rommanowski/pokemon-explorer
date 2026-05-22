import { useEffect, useState } from "react";
import type { Pokemon, PokeListItem } from "../types/pokemon.ts";

export const useAllPokemon = () => {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

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
                            image:
                                detail.sprites.other["official-artwork"]
                                    .front_default,
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

    return { allPokemon, loading, setLoading };
};

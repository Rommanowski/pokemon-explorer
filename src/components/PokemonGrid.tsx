import type { Pokemon } from "../types/pokemon.ts";
import { PokemonTile } from "./PokemonTile.tsx";

type PokemonGridProps = {
    pokemons: Pokemon[];
};

export const PokemonGrid = ({ pokemons }: PokemonGridProps) => {
    return (
        <ul
            aria-label="Pokémon list"
            className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 mx-48 list-none"
        >
            {pokemons.map((p) => (
                <PokemonTile
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    image={p.image}
                    types={p.types}
                />
            ))}
        </ul>
    );
};

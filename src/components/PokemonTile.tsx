import type { Pokemon } from "../types/pokemon.ts";

export const PokemonTile = ( { id, name, image, types }: Pokemon) => {

return(
    <div key={id}>
        <p>{name}</p>
        <img src={image} alt={name} />
        <div>
            {types.join(", ")}
        </div>
    </div>
    )

}
import type { Pokemon } from "../types/pokemon.ts";
import { typeColors } from "../types/typeColors.ts";
import { PokeTypePill } from "./PokeTypePill.tsx";

const getBackground = (types: string[]): string => {
    const colors = types.map(
        (t) => typeColors[t as keyof typeof typeColors] ?? "#777777"
    );

    if (colors.length === 2) {
        return `linear-gradient(90deg, ${colors[0]} 10%, ${colors[1]} 100%)`;
    }

    else{
        return colors[0];
    }
};

export const PokemonTile = ({ id, name, image, types }: Pokemon) => {
    return (
        <div
            key={id}
            className="
                relative
                flex flex-col items-center
                p-4
                rounded-2xl
                overflow-hidden
                transition-transform hover:scale-[1.03]
            "
            style={{ background: getBackground(types) }}
        >


            <img
                src={image}
                alt={name}
                className="relative w-28 h-28 object-contain"
            />

            <p className="relative text-lg font-bold capitalize">
                {name}
            </p>

            <span className="relative text-s font-mono text-white  justify-center">
                #{String(id).padStart(3, "0")}
            </span>

            <div className="relative flex flex-wrap gap-2 mt-2 justify-center">
                {types.map((t) => (
                    <PokeTypePill key={t} type={t} />
                ))}
            </div>
        </div>
    );
};

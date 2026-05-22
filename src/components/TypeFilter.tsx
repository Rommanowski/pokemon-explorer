import { typeColors } from "../types/typeColors.ts";
import { TypeFilterPill } from "./TypeFilterPill.tsx";

type TypeFilterProps = {
    selectedTypes: string[];
    onToggle: (type: string) => void;
};

export const TypeFilter = ({ selectedTypes, onToggle }: TypeFilterProps) => {
    return (
        <div
            role="group"
            aria-label="Filter Pokémon by type"
            className="flex flex-wrap gap-2 px-4 pb-4 justify-center"
        >
            {Object.keys(typeColors).map((type) => (
                <TypeFilterPill
                    key={type}
                    type={type}
                    selected={selectedTypes.includes(type)}
                    onClick={() => onToggle(type)}
                />
            ))}
        </div>
    );
};

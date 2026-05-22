import { typeColors } from "../types/typeColors.ts";

type TypeFilterPillProps = {
    type: string;
    selected: boolean;
    onClick: () => void;
};

export const TypeFilterPill = ({ type, selected, onClick }: TypeFilterPillProps) => {
    const color = typeColors[type as keyof typeof typeColors];

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            aria-label={`Filter by ${type} type`}
            style={{ backgroundColor: color }}
            className={`
                px-3 py-1
                rounded-full
                text-xs font-semibold uppercase
                text-white
                cursor-pointer
                transition
                ${selected ? "ring-2 ring-white" : "ring-1 ring-transparent"}
                hover:ring-2 hover:ring-white
            `}
        >
            {type}
        </button>
    );
};

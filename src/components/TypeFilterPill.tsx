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
            onClick={onClick}
            style={{ backgroundColor: color }}
            className={`
                px-3 py-1
                rounded-full
                text-xs font-semibold uppercase
                text-white
                cursor-pointer
                transition
                ${selected ? "ring-2 ring-white" : "ring-1 ring-transparent"}
            `}
        >
            {type}
        </button>
    );
};

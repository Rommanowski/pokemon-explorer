type PokeTypePillProps = {
    type: string;
};

export const PokeTypePill = ({ type }: PokeTypePillProps) => {
    return (
        <span
            className="
                relative inline-flex items-center justify-center
                px-3 py-1
                text-xs font-semibold uppercase
                text-white
                rounded-full
                bg-white/20
                overflow-hidden
            "
        >
            <span className="relative">
                {type}
            </span>
        </span>
    );
};

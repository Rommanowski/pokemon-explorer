import { useState } from "react";

type SearchBarProps = {
    onSearch: (value: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [value, setValue] = useState("");

    return (
        <div role="search" className="flex justify-center">
            <label htmlFor="pokemon-search" className="sr-only">
                Search Pokémon by name
            </label>
            <input
                id="pokemon-search"
                type="search"
                value={value}
                placeholder="Search Pokémon..."
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={() => {
                    onSearch(value);
                }}
                className="rounded-full p-2 w-200 bg-[#1e1e1e] outline-none mt-4 mb-8"
            />
        </div>
    );
};

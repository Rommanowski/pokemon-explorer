import { useState } from "react";

type SearchBarProps = {
    onSearch: (value: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [value, setValue] = useState("");

    return (
        <div className="flex justify-center">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={() => {
                    onSearch(value);
                }}
                className="rounded-full p-2 w-200 bg-[#1e1e1e] outline-none mt-4 mb-8"
            />
        </div>
    );
};
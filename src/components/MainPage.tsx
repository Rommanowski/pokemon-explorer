import { useState } from "react";
import { SearchBar } from "./SearchBar.tsx";
import { Header } from "./Header.tsx";
import { TypeFilter } from "./TypeFilter.tsx";
import { LoadButton } from "./LoadButton.tsx";
import { PokemonGrid } from "./PokemonGrid.tsx";
import { useAllPokemon } from "../hooks/useAllPokemon.ts";

const PAGE_SIZE = 24;

export const MainPage = () => {
    const { allPokemon, loading, setLoading } = useAllPokemon();
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const filteredPokemon = allPokemon.filter((p) => {
        const matchesName = p.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        const matchesType =
            selectedTypes.length === 0 ||
            p.types.some((t) => selectedTypes.includes(t));
        return matchesName && matchesType;
    });

    const visiblePokemon = filteredPokemon.slice(0, page * PAGE_SIZE);

    const toggleType = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
        setPage(1);
    };

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
        }, 600);
    };

    return (
        <div className="min-h-screen w-full bg-[#121212] text-white">
            <Header />

            <main>
                <SearchBar
                    onSearch={(value) => {
                        setSearchValue(value);
                        setPage(1);
                    }}
                />

                <TypeFilter
                    selectedTypes={selectedTypes}
                    onToggle={toggleType}
                />

                <PokemonGrid pokemons={visiblePokemon} />

                <LoadButton
                    loading={loading}
                    handleLoadMore={handleLoadMore}
                    areMorePokemon={
                        visiblePokemon.length < filteredPokemon.length
                    }
                />
            </main>
        </div>
    );
};

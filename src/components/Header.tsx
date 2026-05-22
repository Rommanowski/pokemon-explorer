import pokeBall from "../assets/poke-ball.png";

export const Header = () => {
    return (
        <header className="w-full flex justify-center items-center gap-3 p-4">
            {/* Ikona */}
            <img src={pokeBall} alt="Pokeball" className="w-12 h-12" />

            {/* Tytuł */}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#ff6800] to-[#ff9e00] text-transparent bg-clip-text">
                Pokemon Explorer
            </h1>
        </header>
    );
};
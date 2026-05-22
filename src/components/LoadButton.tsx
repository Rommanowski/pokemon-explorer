type LoadButtonProps = {
    loading: boolean
    handleLoadMore: () => void
    areMorePokemon: boolean
}

export const LoadButton = ( { loading, handleLoadMore, areMorePokemon }: LoadButtonProps) => {

    return(
        <div className="flex justify-center pb-8">
            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : (
                areMorePokemon && (
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-orange-500 rounded-xl hover:bg-orange-600"
                    >
                        Load more
                    </button>
                )
            )}
        </div>
    )
}
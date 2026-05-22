export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
}

export type PokeListItem = {
    name: string;
    url: string;
};
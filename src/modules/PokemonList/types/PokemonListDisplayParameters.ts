import { PokemonTypesEnum } from "modules/PokemonList/constants";
import { SortingOption } from "modules/PokemonList/types/SortingOption";

export type PokemonListDisplayParameters = {
    nameOrNumber: string;
    types: Array<PokemonTypesEnum>;
    ability: string;
    displayLength: number;
    sortingOption: SortingOption;
};

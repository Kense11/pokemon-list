import { SortingOptionsList } from "modules/PokemonList/constants";
import { PokemonListDisplayParameters } from "modules/PokemonList/types/PokemonListDisplayParameters";

export const listDisplayLengthStep = 10;

export const initialValues: PokemonListDisplayParameters = {
    nameOrNumber: "",
    types: [],
    ability: "",
    displayLength: listDisplayLengthStep,
    sortingOption: SortingOptionsList[0],
};

export enum FormFieldNamesEnum {
    NameOrNumber = "nameOrNumber",
    Types = "types",
    Ability = "ability",
    DisplayLength = "displayLength",
    SortingOption = "sortingOption",
}

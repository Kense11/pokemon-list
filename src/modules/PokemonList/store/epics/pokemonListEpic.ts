import { fetchPokemonByNameEpic } from "modules/PokemonList/store/epics/fetchPokemonByNameEpic";
import { fetchPokemonListEpic } from "modules/PokemonList/store/epics/fetchPokemonListEpic";
import { combineEpics } from "redux-observable";

export const pokemonListEpic = combineEpics(fetchPokemonListEpic, fetchPokemonByNameEpic);

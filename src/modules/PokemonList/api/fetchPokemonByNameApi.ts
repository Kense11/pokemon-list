import { Pokemon } from "pokenode-ts";
import { from, Observable } from "rxjs";
import { pokemonClient } from "shared/services/restApi";

export type FetchPokemonByNameApiParameters = { name: string };

export type FetchPokemonByNameApiPayload = Pokemon;

export const fetchPokemonByNameApi = ({
    name,
}: FetchPokemonByNameApiParameters): Observable<FetchPokemonByNameApiPayload> =>
    from(pokemonClient.getPokemonByName(name));

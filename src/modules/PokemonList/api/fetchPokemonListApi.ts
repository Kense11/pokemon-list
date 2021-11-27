import { NamedAPIResource, Pokemon } from "pokenode-ts";
import { forkJoin, from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { pokemonClient } from "shared/services/restApi";

export type FetchPokemonListApiPayload = Array<Pokemon>;

export const fetchPokemonListApi = (): Observable<FetchPokemonListApiPayload> =>
    from(pokemonClient.listPokemons()).pipe(
        switchMap(({ count }) => pokemonClient.listPokemons(undefined, count)),
        switchMap(({ results }) =>
            forkJoin(
                (results as Array<NamedAPIResource>).map(({ name }) =>
                    pokemonClient.getPokemonByName(name),
                ),
            ),
        ),
        map((pokemonList) => pokemonList.filter(({ is_default }) => is_default)),
    );

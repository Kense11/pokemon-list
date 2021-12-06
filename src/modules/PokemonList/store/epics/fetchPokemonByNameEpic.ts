import { fetchPokemonByNameApi } from "modules/PokemonList/api/fetchPokemonByNameApi";
import { fetchPokemonByNameAction } from "modules/PokemonList/store/pokemonListSlice";
import { of } from "rxjs";
import { catchError, delay, filter, map, switchMap } from "rxjs/operators";
import { createActionMatcher } from "shared/helpers/createActionMatcher";
import { logError } from "shared/helpers/logError";
import { Epic } from "store";

export const fetchPokemonByNameEpic: Epic = (actions$) =>
    actions$.pipe(
        filter(createActionMatcher([fetchPokemonByNameAction.request])),
        delay(500),
        switchMap(({ payload }) =>
            fetchPokemonByNameApi(payload).pipe(
                map(fetchPokemonByNameAction.success),
                catchError((error) => {
                    logError(error);

                    return of(fetchPokemonByNameAction.failure({ error }));
                }),
            ),
        ),
    );

import { fetchPokemonListApi } from "modules/PokemonList/api/fetchPokemonListApi";
import { fetchPokemonListAction } from "modules/PokemonList/store/pokemonListSlice";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { createActionMatcher } from "shared/helpers/createActionMatcher";
import { logError } from "shared/helpers/logError";
import { Epic } from "store";

export const fetchPokemonListEpic: Epic = (actions$) =>
    actions$.pipe(
        filter(createActionMatcher([fetchPokemonListAction.request])),
        switchMap(() =>
            fetchPokemonListApi().pipe(
                map(fetchPokemonListAction.success),
                catchError((error) => {
                    logError(error);

                    return of(fetchPokemonListAction.failure({ error }));
                }),
            ),
        ),
    );

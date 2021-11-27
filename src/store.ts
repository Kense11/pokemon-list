import { pokemonListEpic } from "modules/PokemonList/store/epics/pokemonListEpic";
import { cryptoCurrencyRatesSlice } from "modules/PokemonList/store/pokemonListSlice";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { configureStore } from "@reduxjs/toolkit";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        [cryptoCurrencyRatesSlice.name]: cryptoCurrencyRatesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
        }).concat(epicMiddleware),
});

epicMiddleware.run(combineEpics(pokemonListEpic));

export type RootState = ReturnType<typeof store.getState>;

import { pokemonListEpic } from "modules/PokemonList/store/epics/pokemonListEpic";
import { pokemonListSlice } from "modules/PokemonList/store/pokemonListSlice";
import { combineEpics, createEpicMiddleware, Epic as GenericEpic } from "redux-observable";

import { Action, configureStore } from "@reduxjs/toolkit";

const reducer = {
    [pokemonListSlice.name]: pokemonListSlice.reducer,
};

export type RootState = {
    [Property in keyof typeof reducer]: ReturnType<typeof reducer[Property]>;
};

export type Epic = GenericEpic<Action, Action, RootState>;

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

export const store = configureStore({
    reducer: {
        [pokemonListSlice.name]: pokemonListSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
        }).concat(epicMiddleware),
});

epicMiddleware.run(combineEpics(pokemonListEpic));

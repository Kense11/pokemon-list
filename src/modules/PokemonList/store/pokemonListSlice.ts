import {
    FetchPokemonByNameApiParameters,
    FetchPokemonByNameApiPayload,
} from "modules/PokemonList/api/fetchPokemonByNameApi";
import { FetchPokemonListApiPayload } from "modules/PokemonList/api/fetchPokemonListApi";
import { Pokemon } from "pokenode-ts";
import { LoadingStatusesEnum } from "shared/constants";
import { createAsyncAction } from "shared/helpers/createAsyncAction";
import { RootState } from "store";

import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const sliceName = "pokemonList";

export const fetchPokemonListAction = createAsyncAction<
    undefined,
    FetchPokemonListApiPayload,
    { error: unknown }
>(
    `${sliceName}/fetchPokemonList`,
    `${sliceName}/fetchPokemonListSuccess`,
    `${sliceName}/fetchPokemonListFailure`,
);

export const fetchPokemonByNameAction = createAsyncAction<
    FetchPokemonByNameApiParameters,
    FetchPokemonByNameApiPayload,
    { error: unknown }
>(
    `${sliceName}/fetchPokemonByName`,
    `${sliceName}/fetchPokemonByNameSuccess`,
    `${sliceName}/fetchPokemonByNameFailure`,
);

type AdditionalFields = {
    fetchPokemonListApiLoadingStatus: LoadingStatusesEnum;
    fetchPokemonByNameApiLoadingStatus: LoadingStatusesEnum;
};

const initialAdditionalFields: AdditionalFields = {
    fetchPokemonListApiLoadingStatus: LoadingStatusesEnum.Initial,
    fetchPokemonByNameApiLoadingStatus: LoadingStatusesEnum.Initial,
};

const selectId = ({ name }: Pokemon) => name;

const pokemonListAdapter = createEntityAdapter<Pokemon>({ selectId });

export const pokemonListSlice = createSlice({
    name: sliceName,
    initialState: pokemonListAdapter.getInitialState(initialAdditionalFields),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonListAction.success, (draftState, { payload }) => {
                pokemonListAdapter.addMany(draftState, payload);
                draftState.fetchPokemonListApiLoadingStatus = LoadingStatusesEnum.Loaded;
            })
            .addCase(fetchPokemonListAction.request, (draftState) => {
                draftState.fetchPokemonListApiLoadingStatus = LoadingStatusesEnum.Loading;
            })
            .addCase(fetchPokemonListAction.failure, (draftState) => {
                draftState.fetchPokemonListApiLoadingStatus = LoadingStatusesEnum.Error;
            })
            .addCase(fetchPokemonByNameAction.success, (draftState, { payload }) => {
                pokemonListAdapter.addOne(draftState, payload);
                draftState.fetchPokemonByNameApiLoadingStatus = LoadingStatusesEnum.Error;
            })
            .addCase(fetchPokemonByNameAction.request, (draftState) => {
                draftState.fetchPokemonByNameApiLoadingStatus = LoadingStatusesEnum.Loading;
            })
            .addCase(fetchPokemonByNameAction.failure, (draftState) => {
                draftState.fetchPokemonByNameApiLoadingStatus = LoadingStatusesEnum.Error;
            });
    },
});

const selectSlice = ({ pokemonList }: RootState) => pokemonList;

export const selectPokemonList = pokemonListAdapter.getSelectors(selectSlice).selectAll;

export const selectPokemonListLength = pokemonListAdapter.getSelectors(selectSlice).selectTotal;

export const selectPokemonByName = (name: string) =>
    createSelector(selectSlice, (slice) =>
        pokemonListAdapter.getSelectors().selectById(slice, name),
    );

export const selectFetchPokemonListApiLoadingStatus = createSelector(
    selectSlice,
    ({ fetchPokemonListApiLoadingStatus }) => fetchPokemonListApiLoadingStatus,
);

export const selectFetchPokemonByNameApiLoadingStatus = createSelector(
    selectSlice,
    ({ fetchPokemonByNameApiLoadingStatus }) => fetchPokemonByNameApiLoadingStatus,
);

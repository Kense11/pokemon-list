import React, { FunctionComponent, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select/src/types";

import { Select } from "chakra-react-select";
import { useFormik } from "formik";
import { List } from "modules/PokemonList/components/List/List";
import {
    FormFieldNamesEnum,
    initialValues,
    listDisplayLengthStep,
} from "modules/PokemonList/components/ListDisplayParametersForm/formData";
import {
    PokemonTypeDataDictionary,
    PokemonTypesEnum,
    SortingOptionsList,
} from "modules/PokemonList/constants";
import { adjustPokemonListForDisplay } from "modules/PokemonList/helpers/adjustPokemonListForDisplay";
import {
    fetchPokemonListAction,
    selectFetchPokemonListApiLoadingStatus,
    selectPokemonList,
} from "modules/PokemonList/store/pokemonListSlice";
import { PokemonListDisplayParameters } from "modules/PokemonList/types/PokemonListDisplayParameters";
import { SortingOption } from "modules/PokemonList/types/SortingOption";
import { LoadingStatusesEnum } from "shared/constants";
import { capitalizeFirstStringSymbol } from "shared/helpers/capitalizeFirstStringSymbol";

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    SimpleGrid,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";

const typesSelectOptions = Object.values(PokemonTypeDataDictionary).map(({ type, color }) => ({
    label: capitalizeFirstStringSymbol(type),
    value: type,
    colorScheme: color,
}));

const sortingOptionSelectOptions = [
    {
        label: "Ascending",
        options: [
            { label: "By number", value: SortingOptionsList[0] },
            { label: "By name", value: SortingOptionsList[2] },
        ],
    },
    {
        label: "Descending",
        options: [
            { label: "By number", value: SortingOptionsList[1] },
            { label: "By name", value: SortingOptionsList[3] },
        ],
    },
];

export const ListDisplayForm: FunctionComponent = () => {
    const dispatch = useDispatch();

    const pokemonList = useSelector(selectPokemonList);
    const fetchPokemonListApiLoadingStatus = useSelector(selectFetchPokemonListApiLoadingStatus);

    const controlsStackBorderColor = useColorModeValue("blue.500", "blue.300");

    const { values, getFieldProps, setFieldValue } = useFormik<PokemonListDisplayParameters>({
        initialValues,
        onSubmit: () => {
            // do nothing.
        },
    });

    const increaseDisplayCount = useCallback(
        () =>
            setFieldValue(
                FormFieldNamesEnum.DisplayLength,
                values.displayLength + listDisplayLengthStep,
            ),
        [setFieldValue, values.displayLength],
    );

    const onTypesSelect = useCallback(
        (value: ValueType<{ label: string; value: PokemonTypesEnum }, true>) =>
            setFieldValue(
                FormFieldNamesEnum.Types,
                value.map(({ value }) => value),
            ),
        [setFieldValue],
    );

    const onAbilitySelect = useCallback(
        (selectedAbility: ValueType<{ label: string; value: string }, false>) =>
            setFieldValue(FormFieldNamesEnum.Ability, selectedAbility?.value),
        [setFieldValue],
    );

    const onSortingOptionSelect = useCallback(
        (selectedSortingOption: ValueType<{ label: string; value: SortingOption }, false>) =>
            setFieldValue(FormFieldNamesEnum.SortingOption, selectedSortingOption?.value),
        [setFieldValue],
    );

    const abilitySelectOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    pokemonList
                        .map(({ abilities }) => abilities)
                        .flat()
                        .filter(({ is_hidden }) => is_hidden)
                        .map(({ ability: { name } }) => name),
                ),
            ).map((name) => ({ label: capitalizeFirstStringSymbol(name), value: name })),
        [pokemonList],
    );

    const selectedSortingOption = useMemo(
        () =>
            sortingOptionSelectOptions
                .flatMap(({ options }) => options)
                .find(({ value }) => value === values.sortingOption),
        [values],
    );

    const [pokemonListForDisplay, filteredPokemonListLength] = useMemo(
        () => adjustPokemonListForDisplay(pokemonList, values),
        [values, pokemonList],
    );

    useEffect(() => {
        fetchPokemonListApiLoadingStatus === LoadingStatusesEnum.Initial &&
            dispatch(fetchPokemonListAction.request());
    }, [dispatch, fetchPokemonListApiLoadingStatus]);

    return (
        <VStack as="form" spacing="10" flexGrow="1">
            {fetchPokemonListApiLoadingStatus === LoadingStatusesEnum.Loaded && (
                <VStack
                    maxW="854px"
                    spacing="5"
                    borderWidth="5px"
                    borderRadius="lg"
                    p={5}
                    borderColor={controlsStackBorderColor}
                    alignSelf={{ base: "stretch", sm: "center" }}
                >
                    <Heading size="2x1">Find your pokemon!</Heading>

                    <SimpleGrid columns={3} columnGap="3" rowGap="6">
                        <GridItem colSpan={3}>
                            <FormControl>
                                <FormLabel _hover={{ cursor: "pointer" }}>Select types</FormLabel>

                                <Select
                                    name={FormFieldNamesEnum.Types}
                                    isMulti={true}
                                    options={typesSelectOptions}
                                    size="lg"
                                    placeholder="Fighter"
                                    closeMenuOnSelect={false}
                                    onChange={onTypesSelect}
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={{ base: 3, md: 1 }}>
                            <FormControl>
                                <FormLabel _hover={{ cursor: "pointer" }}>
                                    Enter name or number
                                </FormLabel>

                                <Input
                                    {...getFieldProps(FormFieldNamesEnum.NameOrNumber)}
                                    size="lg"
                                    placeholder="Bulbasaur"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={{ base: 3, md: 1 }}>
                            <FormControl>
                                <FormLabel _hover={{ cursor: "pointer" }}>Select ability</FormLabel>

                                <Select
                                    name={FormFieldNamesEnum.Ability}
                                    options={abilitySelectOptions}
                                    size="lg"
                                    placeholder="Solar-power"
                                    closeMenuOnSelect={true}
                                    onChange={onAbilitySelect}
                                    isClearable={true}
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={{ base: 3, md: 1 }}>
                            <FormControl>
                                <FormLabel _hover={{ cursor: "pointer" }}>
                                    Select sorting option
                                </FormLabel>

                                <Select
                                    name={FormFieldNamesEnum.SortingOption}
                                    options={sortingOptionSelectOptions}
                                    size="lg"
                                    closeMenuOnSelect={true}
                                    onChange={onSortingOptionSelect}
                                    value={selectedSortingOption}
                                />
                            </FormControl>
                        </GridItem>
                    </SimpleGrid>
                </VStack>
            )}

            <Flex flexDir="column" alignSelf="stretch" flexGrow="1">
                <List
                    list={pokemonListForDisplay}
                    listLoadingStatus={fetchPokemonListApiLoadingStatus}
                />
            </Flex>

            {filteredPokemonListLength > values.displayLength && (
                <Button onClick={increaseDisplayCount} colorScheme="blue" size="lg" px="12">
                    Show more
                </Button>
            )}
        </VStack>
    );
};

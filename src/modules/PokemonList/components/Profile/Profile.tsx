import { FunctionComponent, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { Card } from "modules/PokemonList/components/Card/Card";
import { Loader } from "modules/PokemonList/components/Loader/Loader";
import { PokemonStatDataDictionary, PokemonStatsEnum } from "modules/PokemonList/constants";
import {
    fetchPokemonByNameAction,
    selectFetchPokemonByNameApiLoadingStatus,
    selectPokemonByName,
} from "modules/PokemonList/store/pokemonListSlice";
import { LoadingStatusesEnum } from "shared/constants";
import { capitalizeFirstStringSymbol } from "shared/helpers/capitalizeFirstStringSymbol";

import {
    Alert,
    AlertIcon,
    Center,
    CircularProgress,
    CircularProgressLabel,
    Link,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
    useColorModeValue,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";

const statsFromMaxColorsByPercents = [
    { percent: 33, color: "blue.400" },
    { percent: 66, color: "green.400" },
    { percent: 100, color: "red.500" },
];

export const Profile: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { pokemonName } = useParams<{ pokemonName: string }>();

    const pokemon = useSelector(selectPokemonByName(pokemonName));

    const fetchPokemonByNameApiLoadingStatus = useSelector(
        selectFetchPokemonByNameApiLoadingStatus,
    );

    const statsBackgroundColor = useColorModeValue("gray.100", "none");
    const circularProgressTrackColor = useColorModeValue("gray.300", "gray.100");

    const formattedPokemonName = capitalizeFirstStringSymbol(pokemonName);

    const formattedAbilitiesString = useMemo(
        () =>
            pokemon?.abilities
                .filter(({ is_hidden }) => !is_hidden)
                .map(({ ability: { name } }) => capitalizeFirstStringSymbol(name))
                .join(", "),
        [pokemon?.abilities],
    );

    const statsDataForCircularProgress = useMemo(
        () =>
            pokemon?.stats.map(({ base_stat, stat: { name } }) => {
                const label = capitalizeFirstStringSymbol(name).replace("-", " ");

                const percentFromMax = Math.round(
                    (base_stat / PokemonStatDataDictionary[name as PokemonStatsEnum].maxValue) *
                        100,
                );

                const colorForProgress = statsFromMaxColorsByPercents.find(
                    ({ percent }) => percentFromMax <= percent,
                )?.color;

                return {
                    label,
                    value: base_stat,
                    percentFromMax,
                    colorForProgress,
                };
            }),
        [pokemon?.stats],
    );

    useEffect(() => {
        !pokemon && dispatch(fetchPokemonByNameAction.request({ name: pokemonName }));
    }, [dispatch, pokemon, pokemonName]);

    return (
        <>
            {fetchPokemonByNameApiLoadingStatus === LoadingStatusesEnum.Loading && (
                <VStack justifyContent="space-evenly" flexGrow="1">
                    <Loader h="40vmin" pointerEvents="none" />

                    <Text>Catching {formattedPokemonName}...</Text>
                </VStack>
            )}

            {!pokemon && fetchPokemonByNameApiLoadingStatus === LoadingStatusesEnum.Error && (
                <Center m="auto">
                    <Alert status="error">
                        <AlertIcon />

                        <Text>
                            Sorry, we couldn't catch {formattedPokemonName} at this time. Please try
                            again later
                        </Text>
                    </Alert>
                </Center>
            )}

            {pokemon && (
                <VStack spacing="5" alignItems="stretch">
                    <Center>
                        <Card pokemon={pokemon} />
                    </Center>

                    <Center>
                        <StatGroup
                            flexGrow="1"
                            maxW="1000px"
                            borderWidth="1px"
                            borderRadius="lg"
                            p="5"
                            backgroundColor={statsBackgroundColor}
                        >
                            <Stat m="5">
                                <StatLabel>Height</StatLabel>

                                <StatNumber>{pokemon.height} dm</StatNumber>
                            </Stat>

                            <Stat m="5">
                                <StatLabel>Weight</StatLabel>

                                <StatNumber>{pokemon.weight} hg</StatNumber>
                            </Stat>

                            <Stat m="5">
                                <StatLabel>Base experience</StatLabel>

                                <StatNumber>{pokemon.base_experience}</StatNumber>
                            </Stat>

                            <Stat m="5">
                                <StatLabel>Abilities</StatLabel>

                                <StatNumber>{formattedAbilitiesString}</StatNumber>
                            </Stat>
                        </StatGroup>
                    </Center>

                    <Center>
                        <Wrap
                            spacing="30px"
                            justify="center"
                            maxW="1000px"
                            borderWidth="1px"
                            borderRadius="lg"
                            p="5"
                            backgroundColor={statsBackgroundColor}
                        >
                            {statsDataForCircularProgress?.map(
                                ({ label, value, percentFromMax, colorForProgress }) => (
                                    <VStack key={label} as={WrapItem}>
                                        <Text>{label}</Text>

                                        <CircularProgress
                                            value={percentFromMax}
                                            size="120px"
                                            color={colorForProgress}
                                            trackColor={circularProgressTrackColor}
                                        >
                                            <CircularProgressLabel>{value}</CircularProgressLabel>
                                        </CircularProgress>
                                    </VStack>
                                ),
                            )}
                        </Wrap>
                    </Center>

                    <Link
                        to="/list"
                        as={NavLink}
                        color="teal.500"
                        fontSize="2xl"
                        alignSelf="center"
                    >
                        Catch other pokemon
                    </Link>
                </VStack>
            )}
        </>
    );
};

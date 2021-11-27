import { FunctionComponent } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

import { Card } from "modules/PokemonList/components/Card/Card";
import { Loader } from "modules/PokemonList/components/Loader/Loader";
import { Pokemon } from "pokenode-ts";
import { LoadingStatusesEnum } from "shared/constants";

import { Alert, AlertIcon, Center, SimpleGrid, Text, VStack } from "@chakra-ui/react";

type ListProps = {
    list: Array<Pokemon>;
    listLoadingStatus: LoadingStatusesEnum;
};

export const List: FunctionComponent<ListProps> = ({ list, listLoadingStatus }) => {
    const { url } = useRouteMatch();

    return (
        <>
            {listLoadingStatus === LoadingStatusesEnum.Loading && (
                <VStack justifyContent="space-evenly" flexGrow="1">
                    <Loader h="40vmin" pointerEvents="none" />

                    <Text>Catching all pokemon...</Text>
                </VStack>
            )}

            {listLoadingStatus === LoadingStatusesEnum.Error && (
                <Center m="auto">
                    <Alert status="error">
                        <AlertIcon />

                        <Text>
                            Sorry, we couldn't catch all pokemon at this time. Please try again
                            later
                        </Text>
                    </Alert>
                </Center>
            )}

            {listLoadingStatus === LoadingStatusesEnum.Loaded && (
                <SimpleGrid minChildWidth="320px" spacing="40px" w="full">
                    {list.map((pokemon) => (
                        <Center as={NavLink} key={pokemon.name} to={`${url}/${pokemon.name}`}>
                            <Card pokemon={pokemon} applyHoverStyling={true} />
                        </Center>
                    ))}
                </SimpleGrid>
            )}
        </>
    );
};

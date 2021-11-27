import { FunctionComponent } from "react";

import { TypeBadge } from "modules/PokemonList/components/TypeBadge/TypeBadge";
import { PokemonTypeDataDictionary, PokemonTypesEnum } from "modules/PokemonList/constants";
import { Pokemon } from "pokenode-ts";
import { capitalizeFirstStringSymbol } from "shared/helpers/capitalizeFirstStringSymbol";

import { Box, Flex, Image, Spinner, Square, useColorModeValue, Wrap } from "@chakra-ui/react";

type CardProps = { pokemon: Pokemon; applyHoverStyling?: boolean };

export const Card: FunctionComponent<CardProps> = ({ pokemon, applyHoverStyling }) => {
    const cardBackgroundColor = useColorModeValue("gray.100", "none");
    const cardHoverShadow = useColorModeValue("2xl", "dark-lg");

    const formattedPokemonName = capitalizeFirstStringSymbol(pokemon.name);
    const formattedPokemonNumber = String(pokemon.id).padStart(3, "0");
    const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedPokemonNumber}.png`;

    return (
        <Flex
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            background={cardBackgroundColor}
            _hover={{ boxShadow: applyHoverStyling && cardHoverShadow }}
            flexDir="column"
            flexGrow="1"
        >
            <Square flexBasis="382px">
                <Image
                    src={pokemonImageUrl}
                    alt={pokemon.name}
                    fallback={<Spinner thickness="4px" speed="0.65s" size="xl" />}
                />
            </Square>

            <Box p="6">
                <Wrap spacing="1" mt="1">
                    {pokemon.types.map(({ type: { name } }) => (
                        <TypeBadge
                            key={name}
                            {...PokemonTypeDataDictionary[name as PokemonTypesEnum]}
                        />
                    ))}
                </Wrap>

                <Box mt="3" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated={true}>
                    {formattedPokemonName}
                </Box>

                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                >
                    #{formattedPokemonNumber}
                </Box>
            </Box>
        </Flex>
    );
};

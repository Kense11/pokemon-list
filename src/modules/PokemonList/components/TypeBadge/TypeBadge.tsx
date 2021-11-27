import { FunctionComponent } from "react";

import { PokemonTypeData } from "modules/PokemonList/types/PokemonTypeData";
import { capitalizeFirstStringSymbol } from "shared/helpers/capitalizeFirstStringSymbol";

import { Badge, Circle, VStack } from "@chakra-ui/react";

type TypeBadgeProps = PokemonTypeData;

export const TypeBadge: FunctionComponent<TypeBadgeProps> = ({ icon: Icon, type, color }) => {
    const formattedType = capitalizeFirstStringSymbol(type);

    return (
        <VStack>
            <Circle background={color} size="32px">
                <Icon height="60%" width="60%" />
            </Circle>

            <Badge borderRadius="full" px="2" colorScheme={color}>
                {formattedType}
            </Badge>
        </VStack>
    );
};

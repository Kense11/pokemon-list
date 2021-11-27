import { FunctionComponent, SVGProps } from "react";

import { PokemonTypesEnum } from "modules/PokemonList/constants";

export type PokemonTypeData = {
    type: PokemonTypesEnum;
    color: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
};

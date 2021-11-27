import { PokemonTypesEnum } from "modules/PokemonList/constants";
import { PokemonListDisplayParameters } from "modules/PokemonList/types/PokemonListDisplayParameters";
import { SortingOption } from "modules/PokemonList/types/SortingOption";
import { Pokemon } from "pokenode-ts";

const sortingFunctionsRecord: Record<
    SortingOption["field"],
    (list: Array<Pokemon>, direction: SortingOption["direction"]) => Array<Pokemon>
> = {
    name(list, direction) {
        return [...list].sort(({ name: firstName }, { name: secondName }) =>
            direction === "asc"
                ? firstName.localeCompare(secondName)
                : secondName.localeCompare(firstName),
        );
    },
    id(list, direction) {
        return [...list].sort(({ id: firstId }, { id: secondId }) =>
            direction === "asc" ? firstId - secondId : secondId - firstId,
        );
    },
};

export const adjustPokemonListForDisplay = (
    list: Array<Pokemon>,
    {
        nameOrNumber,
        ability: selectedAbility,
        types: selectedTypes,
        displayLength,
        sortingOption,
    }: PokemonListDisplayParameters,
): [Array<Pokemon>, number] => {
    const filteredList = list
        .filter(({ name, id }) =>
            [name, String(id)].some((item) => item.includes(nameOrNumber.trim().toLowerCase())),
        )
        .filter(({ abilities }) =>
            selectedAbility
                ? abilities
                      .filter((ability) => !ability.is_hidden)
                      .some(({ ability: { name } }) => name === selectedAbility)
                : true,
        )
        .filter(({ types }) =>
            selectedTypes.length
                ? types.some(({ type: { name } }) =>
                      selectedTypes.includes(name as PokemonTypesEnum),
                  )
                : true,
        );

    const sortedList = sortingFunctionsRecord[sortingOption.field](
        filteredList,
        sortingOption.direction,
    );

    return [sortedList.slice(0, displayLength), filteredList.length];
};

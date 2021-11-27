import { ReactComponent as BugTypeIcon } from "modules/PokemonList/assets/icons/bug.svg";
import { ReactComponent as DarkTypeIcon } from "modules/PokemonList/assets/icons/dark.svg";
import { ReactComponent as DragonTypeIcon } from "modules/PokemonList/assets/icons/dragon.svg";
import { ReactComponent as ElectricTypeIcon } from "modules/PokemonList/assets/icons/electric.svg";
import { ReactComponent as FairyTypeIcon } from "modules/PokemonList/assets/icons/fairy.svg";
import { ReactComponent as FightingTypeIcon } from "modules/PokemonList/assets/icons/fighting.svg";
import { ReactComponent as FireTypeIcon } from "modules/PokemonList/assets/icons/fire.svg";
import { ReactComponent as FlyingTypeIcon } from "modules/PokemonList/assets/icons/flying.svg";
import { ReactComponent as GhostTypeIcon } from "modules/PokemonList/assets/icons/ghost.svg";
import { ReactComponent as GrassTypeIcon } from "modules/PokemonList/assets/icons/grass.svg";
import { ReactComponent as GroundTypeIcon } from "modules/PokemonList/assets/icons/ground.svg";
import { ReactComponent as IceTypeIcon } from "modules/PokemonList/assets/icons/ice.svg";
import { ReactComponent as NormalTypeIcon } from "modules/PokemonList/assets/icons/normal.svg";
import { ReactComponent as PoisonTypeIcon } from "modules/PokemonList/assets/icons/poison.svg";
import { ReactComponent as PsychicTypeIcon } from "modules/PokemonList/assets/icons/psychic.svg";
import { ReactComponent as RockTypeIcon } from "modules/PokemonList/assets/icons/rock.svg";
import { ReactComponent as SteelTypeIcon } from "modules/PokemonList/assets/icons/steel.svg";
import { ReactComponent as WaterTypeIcon } from "modules/PokemonList/assets/icons/water.svg";
import { PokemonStatData } from "modules/PokemonList/types/PokemonStatData";
import { PokemonTypeData } from "modules/PokemonList/types/PokemonTypeData";
import { SortingOption } from "modules/PokemonList/types/SortingOption";

export enum PokemonTypesEnum {
    Normal = "normal",
    Fighting = "fighting",
    Flying = "flying",
    Poison = "poison",
    Ground = "ground",
    Rock = "rock",
    Bug = "bug",
    Ghost = "ghost",
    Steel = "steel",
    Fire = "fire",
    Water = "water",
    Grass = "grass",
    Electric = "electric",
    Psychic = "psychic",
    Ice = "ice",
    Dragon = "dragon",
    Dark = "dark",
    Fairy = "fairy",
}

export const PokemonTypeDataDictionary: Record<PokemonTypesEnum, PokemonTypeData> = {
    [PokemonTypesEnum.Normal]: {
        type: PokemonTypesEnum.Normal,
        icon: NormalTypeIcon,
        color: "gray",
    },
    [PokemonTypesEnum.Fighting]: {
        type: PokemonTypesEnum.Fighting,
        icon: FightingTypeIcon,
        color: "red",
    },
    [PokemonTypesEnum.Flying]: {
        type: PokemonTypesEnum.Flying,
        icon: FlyingTypeIcon,
        color: "blue",
    },
    [PokemonTypesEnum.Poison]: {
        type: PokemonTypesEnum.Poison,
        icon: PoisonTypeIcon,
        color: "purple",
    },
    [PokemonTypesEnum.Ground]: {
        type: PokemonTypesEnum.Ground,
        icon: GroundTypeIcon,
        color: "orange",
    },
    [PokemonTypesEnum.Rock]: {
        type: PokemonTypesEnum.Rock,
        icon: RockTypeIcon,
        color: "yellow",
    },
    [PokemonTypesEnum.Bug]: {
        type: PokemonTypesEnum.Bug,
        icon: BugTypeIcon,
        color: "green",
    },
    [PokemonTypesEnum.Ghost]: {
        type: PokemonTypesEnum.Ghost,
        icon: GhostTypeIcon,
        color: "blue",
    },
    [PokemonTypesEnum.Steel]: {
        type: PokemonTypesEnum.Steel,
        icon: SteelTypeIcon,
        color: "teal",
    },
    [PokemonTypesEnum.Fire]: {
        type: PokemonTypesEnum.Fire,
        icon: FireTypeIcon,
        color: "orange",
    },
    [PokemonTypesEnum.Water]: {
        type: PokemonTypesEnum.Water,
        icon: WaterTypeIcon,
        color: "blue",
    },
    [PokemonTypesEnum.Grass]: {
        type: PokemonTypesEnum.Grass,
        icon: GrassTypeIcon,
        color: "green",
    },
    [PokemonTypesEnum.Electric]: {
        type: PokemonTypesEnum.Electric,
        icon: ElectricTypeIcon,
        color: "yellow",
    },
    [PokemonTypesEnum.Psychic]: {
        type: PokemonTypesEnum.Psychic,
        icon: PsychicTypeIcon,
        color: "red",
    },
    [PokemonTypesEnum.Ice]: {
        type: PokemonTypesEnum.Ice,
        icon: IceTypeIcon,
        color: "teal",
    },
    [PokemonTypesEnum.Dragon]: {
        type: PokemonTypesEnum.Dragon,
        icon: DragonTypeIcon,
        color: "blue",
    },
    [PokemonTypesEnum.Dark]: {
        type: PokemonTypesEnum.Dark,
        icon: DarkTypeIcon,
        color: "black",
    },
    [PokemonTypesEnum.Fairy]: {
        type: PokemonTypesEnum.Fairy,
        icon: FairyTypeIcon,
        color: "pink",
    },
};

export const SortingOptionsList: Array<SortingOption> = [
    {
        field: "id",
        direction: "asc",
    },
    {
        field: "id",
        direction: "desc",
    },
    {
        field: "name",
        direction: "asc",
    },
    {
        field: "name",
        direction: "desc",
    },
];

export enum PokemonStatsEnum {
    Hp = "hp",
    Attack = "attack",
    Defense = "defense",
    SpecialAttack = "special-attack",
    SpecialDefense = "special-defense",
    Speed = "speed",
}

export const PokemonStatDataDictionary: Record<PokemonStatsEnum, PokemonStatData> = {
    [PokemonStatsEnum.Hp]: {
        stat: PokemonStatsEnum.Hp,
        maxValue: 255,
    },
    [PokemonStatsEnum.Attack]: {
        stat: PokemonStatsEnum.Attack,
        maxValue: 190,
    },
    [PokemonStatsEnum.Defense]: {
        stat: PokemonStatsEnum.Defense,
        maxValue: 250,
    },
    [PokemonStatsEnum.SpecialAttack]: {
        stat: PokemonStatsEnum.SpecialAttack,
        maxValue: 194,
    },
    [PokemonStatsEnum.SpecialDefense]: {
        stat: PokemonStatsEnum.SpecialDefense,
        maxValue: 250,
    },
    [PokemonStatsEnum.Speed]: {
        stat: PokemonStatsEnum.Speed,
        maxValue: 200,
    },
};

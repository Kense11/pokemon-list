import { FunctionComponent } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from "@chakra-ui/react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: FunctionComponent<ColorModeSwitcherProps> = (props) => {
    const { toggleColorMode } = useColorMode();

    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <IconButton
            display="flex"
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
            aria-label={`Switch to ${text} mode`}
            {...props}
        />
    );
};

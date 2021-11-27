import pokeBallImage from "modules/PokemonList/assets/images/pokeBall.png";

import {
    forwardRef,
    Image,
    ImageProps,
    keyframes,
    usePrefersReducedMotion,
} from "@chakra-ui/react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Loader = forwardRef<ImageProps, "img">((props, ref) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const animation = prefersReducedMotion ? undefined : `${spin} infinite 3s linear`;

    return <Image animation={animation} src={pokeBallImage} ref={ref} {...props} />;
});

import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { chakraTheme } from "chakraTheme";
import { ColorModeSwitcher } from "modules/App/components/ColorModeSwitcher/ColorModeSwitcher";
import { PokemonList } from "modules/PokemonList/PokemonList";
import { store } from "store";

import { ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";

export const App = () => (
    <StrictMode>
        <ColorModeScript />

        <Provider store={store}>
            <ChakraProvider theme={chakraTheme}>
                <BrowserRouter>
                    <Flex minH="100vh" fontSize="xl" p={3} align="stretch" flexDir="column">
                        <ColorModeSwitcher ml="auto" mb="3" />

                        <Flex flexGrow="1" flexDir="column">
                            <Switch>
                                <Route path="/list">
                                    <PokemonList />
                                </Route>

                                <Redirect to="/list" />
                            </Switch>
                        </Flex>
                    </Flex>
                </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </StrictMode>
);

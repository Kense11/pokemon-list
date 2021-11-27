import { FunctionComponent } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { ListDisplayForm } from "modules/PokemonList/components/ListDisplayParametersForm/ListDisplayForm";
import { Profile } from "modules/PokemonList/components/Profile/Profile";

export const PokemonList: FunctionComponent = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={path} exact={true}>
                <ListDisplayForm />
            </Route>

            <Route path={`${path}/:pokemonName`}>
                <Profile />
            </Route>
        </Switch>
    );
};

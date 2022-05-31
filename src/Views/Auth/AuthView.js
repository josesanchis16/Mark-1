import { Route, Switch } from "react-router-dom";
import { AuthRoutes } from "../../Routes";

const AuthView = () => {
    return (
        <Switch>
            {AuthRoutes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        {...route}
                        component={() => (
                            route.layout ?
                                <route.layout>
                                    <route.component />
                                </route.layout>
                                :
                                <route.component />
                        )}
                    />
                );
            })}
        </Switch>
    )
}

export default AuthView;
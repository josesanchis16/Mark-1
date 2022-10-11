import { Route, Switch } from "react-router-dom";
import { AuthRoutes } from "../../Routes";
import NotFound from "../404";

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
            <Route path="*" exact={false} component={NotFound} />
        </Switch>
    )
}

export default AuthView;
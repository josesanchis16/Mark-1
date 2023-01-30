import { Redirect, Route, Switch } from "react-router";
import { RECORDS_PATH } from "../../Paths";
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
            {/* <Route path="*" exact={false} component={NotFound} /> */}
            <Redirect to={RECORDS_PATH} />
        </Switch>
    )
}

export default AuthView;
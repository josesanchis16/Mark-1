import { Switch } from "react-router";
import { Route } from "react-router-dom";
import DefaultLayout from "../../Layouts/DefaultLayout/DefaultLayout";
import { AppRoutes } from "../../Routes";

const AppView = () => {
    return (
        <DefaultLayout>
            <Switch>
                {AppRoutes.map((route, index) => (
                    <Route
                        {...route}
                        key={index}
                        component={() => (
                            <route.component />
                        )} />
                ))}
            </Switch>
        </DefaultLayout>
    )
}

export default AppView
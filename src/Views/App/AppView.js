import { Switch } from "react-router";
import { Route } from "react-router-dom";
import DefaultLayout from "../../Layouts/DefaultLayout/DefaultLayout";
import { AppRoutes } from "../../Routes";
import NotFound from "../404";

const AppView = () => {
    console.log('hei');
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
                <Route path="*" exact={false} component={NotFound} />
            </Switch>
        </DefaultLayout>
    )
}

export default AppView
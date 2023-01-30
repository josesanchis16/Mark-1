import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router";
import useCheckUser from "../../Hooks/useCheckUser";
import DefaultLayout from "../../Layouts/DefaultLayout/DefaultLayout";
import { LOGIN_PATH, RECORDS_PATH } from "../../Paths";
import { getSetUserAction } from "../../Redux/Reducers/User/Actions";
import { AppRoutes } from "../../Routes";
import { encryptString } from "../../Utils/GeneralFunctions";
import { Roles } from "../../Utils/Roles";
import { StorageKeys } from "../../Utils/StorageKeys";

const AppView = () => {

    const dispatch = useDispatch();
    const checkUser = useCheckUser();
    const { listen, replace } = useHistory();

    useEffect(() => {
        checkToken();
        let unlisten = listen(() => { checkToken() })
        return unlisten;
    }, [])

    const checkToken = () => {
        checkUser()
            .then(res => {
                if (res && res.status) {
                    localStorage.setItem(StorageKeys.TOKEN, res.user.token);
                    localStorage.setItem(StorageKeys.ROLE, encryptString(Roles.find(item => item.id === +res.user.role).name));
                    dispatch(getSetUserAction(res.user));
                } else replace(LOGIN_PATH);
            })
    }

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
                <Redirect to={RECORDS_PATH} />
            </Switch>
        </DefaultLayout>
    )
}

export default AppView
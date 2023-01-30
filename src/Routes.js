import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout/AuthLayout';
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout';
import { APP_PATH, AUTH_PATH, EDIT_MACHINE_PATH, EDIT_ORDER_PATH, EDIT_USER_PATH, LOGIN_PATH, MACHINES_PATH, NEW_MACHINE_PATH, NEW_ORDER_PATH, NEW_USER_PATH, NOT_FOUND_PATH, ORDERS_PATH, RECORDS_PATH, SETTINGS_EDIT_INPUT_PATH, SETTINGS_INPUTS_PATH, SETTINGS_LOGS_PATH, SETTINGS_NEW_INPUT_PATH, SETTINGS_VIEW_LOG_PATH, USERS_PATH } from './Paths';
import NotFound from './Views/404';
import AppView from './Views/App/AppView';
import AuthView from './Views/Auth/AuthView';

const getRoute = (path, component, title = "", layout = null, exact = false) => ({ path, component, title, exact, layout });

const DefaultRoute = getRoute('/', () => (<Redirect to={LOGIN_PATH} />));
const NotFoundRoute = getRoute(NOT_FOUND_PATH, NotFound);

//Auth routes
const AuthPathRoute = getRoute(AUTH_PATH, AuthView);

const LoginView = React.lazy(() => import('./Views/Auth/Login/LoginView'));
const LoginRoute = getRoute(LOGIN_PATH, LoginView, null, AuthLayout);

// const ForgotPasswordView = React.lazy(() => import('./Views/Auth/ForgotPassword/ForgotPasswordView'));
// const ForgotPasswordRoute = getRoute(FORGOT_PASSWORD_PATH, ForgotPasswordView, AuthLayout);

// const ResetPasswordView = React.lazy(() => import('./Views/Auth/ResetPassword/ResetPassword'));
// const ResetPasswordRoute = getRoute(RESET_PASSWORD_PATH, ResetPasswordView, AuthLayout);

//App
const AppPathRoute = getRoute(APP_PATH, AppView);

//Users
const UsersView = React.lazy(() => import('./Views/App/Users/AllUsers/AllUsers'));
const UsersRoute = getRoute(USERS_PATH, UsersView, null, DefaultLayout, true);

const NewUserView = React.lazy(() => import('./Views/App/Users/NewUser/NewUser'));
const NewUserRoute = getRoute(NEW_USER_PATH, NewUserView, null, DefaultLayout, true);

const EditUserView = React.lazy(() => import("./Views/App/Users/EditUser/EditUser"));
const EditUserRoute = getRoute(EDIT_USER_PATH, EditUserView, null, DefaultLayout, true);

//Records
const RecordsView = React.lazy(() => import('./Views/App/Records/Records'));
const RecordRoute = getRoute(RECORDS_PATH, RecordsView, null, DefaultLayout, true);

//Orders
const OrderView = React.lazy(() => import('./Views/App/Order/AllOrders/Orders'));
const OrderRoute = getRoute(ORDERS_PATH, OrderView, null, DefaultLayout, true);

const NewOrderView = React.lazy(() => import('./Views/App/Order/NewOrder/NewOrder'));
const NewOrderRoute = getRoute(NEW_ORDER_PATH, NewOrderView, null, DefaultLayout, true);

const EditOrderView = React.lazy(() => import('./Views/App/Order/EditOrder/EditOrder'));
const EditOrderRoute = getRoute(EDIT_ORDER_PATH, EditOrderView, null, DefaultLayout, true);

//Machines
const MachinesView = React.lazy(() => import('./Views/App/Machines/AllMachines/Machines'));
const MachinesRoute = getRoute(MACHINES_PATH, MachinesView, null, DefaultLayout, true);

const NewMachineView = React.lazy(() => import('./Views/App/Machines/NewMachine/NewMachine'));
const NewMachineRoute = getRoute(NEW_MACHINE_PATH, NewMachineView, null, DefaultLayout, true);

const EditMachineView = React.lazy(() => import('./Views/App/Machines/EditMachine/EditMachine'));
const EditMachineRoute = getRoute(EDIT_MACHINE_PATH, EditMachineView, null, DefaultLayout, true);

//Settings views
const InputsSettingsView = React.lazy(() => import('./Views/App/Settings/Inputs/AllInputs/AllInputs'));
const InputsSettingsRoute = getRoute(SETTINGS_INPUTS_PATH, InputsSettingsView, "Entradas", null, true);

const NewInputsSettingsView = React.lazy(() => import('./Views/App/Settings/Inputs/NewInput/NewInput'));
const NewInputsSettingsRoute = getRoute(SETTINGS_NEW_INPUT_PATH, NewInputsSettingsView, null, DefaultLayout, true);

const EditInputsSettingsView = React.lazy(() => import('./Views/App/Settings/Inputs/EditInput/EditInput'));
const EditInputsSettingsRoute = getRoute(SETTINGS_EDIT_INPUT_PATH, EditInputsSettingsView, null, DefaultLayout, true);

const LogsSettingsView = React.lazy(() => import("./Views/App/Settings/Logs/AllLogs/AllLogs"));
const LogsSettingsRoute = getRoute(SETTINGS_LOGS_PATH, LogsSettingsView, null, DefaultLayout, true);

const ViewLogSettingsView = React.lazy(() => import('./Views/App/Settings/Logs/ViewLog/ViewLog'));
const ViewLogSettingsRoute = getRoute(SETTINGS_VIEW_LOG_PATH, ViewLogSettingsView, null, DefaultLayout, true);
//Exports
export const AuthRoutes = [
    LoginRoute,
    // ForgotPasswordRoute,
    // ResetPasswordRoute,
    NotFoundRoute,
]

export const AppRoutes = [
    RecordRoute,

    //Order
    OrderRoute,
    NewOrderRoute,
    EditOrderRoute,

    //Machines
    MachinesRoute,
    NewMachineRoute,
    EditMachineRoute,

    //Users
    UsersRoute,
    NewUserRoute,
    EditUserRoute,

    //Settings
    InputsSettingsRoute,
    NewInputsSettingsRoute,
    EditInputsSettingsRoute,

    LogsSettingsRoute,
    ViewLogSettingsRoute,
]

export const MainRoutes = [
    //Auth
    AuthPathRoute,

    //App
    AppPathRoute,

    DefaultRoute,
    NotFoundRoute,
]

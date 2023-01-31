import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout/AuthLayout';
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout';
import { APP_PATH, AUTH_PATH, EDIT_USER_PATH, LOGIN_PATH, NEW_USER_PATH, NOT_FOUND_PATH, USERS_PATH } from './Paths';
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

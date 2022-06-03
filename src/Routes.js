import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout/AuthLayout';
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout';
import { APP_PATH, AUTH_PATH, LOGIN_PATH, NOT_FOUND_PATH, SECTION_1_PATH, SECTION_2_PATH, SECTION_3_PATH, SECTION_4_PATH } from './Paths';
import NotFound from './Views/404';
import AppView from './Views/App/AppView';
import AuthView from './Views/Auth/AuthView';

const getRoute = (path, component, layout = null, exact = false) => ({ path, component, exact, layout });

const DefaultRoute = getRoute('/', () => (<Redirect to={LOGIN_PATH} />));
const NotFoundRoute = getRoute(NOT_FOUND_PATH, NotFound);

//Auth routes
const AuthPathRoute = getRoute(AUTH_PATH, AuthView);

const LoginView = React.lazy(() => import('./Views/Auth/Login/LoginView'));
const LoginRoute = getRoute(LOGIN_PATH, LoginView, AuthLayout);

//App
const AppPathRoute = getRoute(APP_PATH, AppView);

const DashboardView = React.lazy(() => import('./Views/App/Dashboard/DashboardView'));
const DashboardRoute = getRoute(SECTION_1_PATH, DashboardView, DefaultLayout, true);

const ColorsView = React.lazy(() => import('./Views/App/Colors/ColorsView'));
const ColorsRoute = getRoute(SECTION_2_PATH, ColorsView, DefaultLayout, true);

const BreadcrumbView = React.lazy(() => import('./Views/App/Breadcrumb/BreadcrumbView'));
const BreadcrumbRoute = getRoute(SECTION_3_PATH, BreadcrumbView, DefaultLayout, true);

const CardsView = React.lazy(() => import('./Views/App/Cards/CardsView'));
const CardsRoute = getRoute(SECTION_4_PATH, CardsView, DefaultLayout, true);

//Exports
export const AuthRoutes = [
    LoginRoute,
    NotFoundRoute,
]

export const AppRoutes = [
    DashboardRoute,
    ColorsRoute,
    BreadcrumbRoute,
    CardsRoute,
    NotFoundRoute,
]

export const MainRoutes = [

    //Auth
    AuthPathRoute,

    //App
    AppPathRoute,

    DefaultRoute,
    NotFoundRoute,
]

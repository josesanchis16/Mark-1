import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout/AuthLayout';
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout';
import { APP_PATH, AUTH_PATH, LOGIN_PATH, NOT_FOUND_PATH, SECTION_1_PATH, SECTION_2_PATH, SECTION_3_PATH, SECTION_4_PATH } from './Paths';
import NotFound from './Views/404';
import AppView from './Views/App/AppView';
import AuthView from './Views/Auth/AuthView';

const DefaultRoute = {
    path: '/',
    exact: false,
    layout: null,
    component: () => (<Redirect to={LOGIN_PATH} />)
}

const NotFoundRoute = {
    path: NOT_FOUND_PATH,
    exact: false,
    layout: null,
    component: () => (<NotFound />)
}

//Auth routes
const AuthPathRoute = {
    path: AUTH_PATH,
    exact: false,
    layout: null,
    component: AuthView,
}

const LoginView = React.lazy(() => import('./Views/Auth/Login/LoginView'));
const LoginRoute = {
    path: LOGIN_PATH,
    exact: true,
    layout: AuthLayout,
    component: LoginView
}

//App
const AppPathRoute = {
    path: APP_PATH,
    exact: false,
    component: AppView
}

const DashboardView = React.lazy(() => import('./Views/App/Dashboard/DashboardView'));
const DashboardRoute = {
    path: SECTION_1_PATH,
    exact: true,
    layout: DefaultLayout,
    component: DashboardView,
}

const ColorsView = React.lazy(() => import('./Views/App/Colors/ColorsView'));
const ColorsRoute = {
    path: SECTION_2_PATH,
    exact: true,
    layout: DefaultLayout,
    component: ColorsView,
}

const BreadcrumbView = React.lazy(() => import('./Views/App/Breadcrumb/BreadcrumbView'));
const BreadcrumbRoute = {
    path: SECTION_3_PATH,
    exact: true,
    layout: DefaultLayout,
    component: BreadcrumbView
}

const CardsView = React.lazy(() => import('./Views/App/Cards/CardsView'));
const CardsRoute = {
    path: SECTION_4_PATH,
    exact: true,
    layout: DefaultLayout,
    component: CardsView
}

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

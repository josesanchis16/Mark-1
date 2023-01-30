import moment from "moment";

const {
    REACT_APP_VERSION_NUMBER,
    REACT_APP_VERSION_DATE,
    REACT_APP_API_NUMBER,
    NODE_ENV
} = process.env;
export const isDev = NODE_ENV === 'development';

export const BASE_PATHS = {
    Auth: '/auth',
    App: '/app',
}

let apiUrl = '';
let apiKey = '';
switch (+REACT_APP_API_NUMBER) {
    case 0:
        apiUrl = 'http://192.168.0.106/Fiverr/Productos/api/Endpoints';
        apiKey = "JustAnotherRandomApiKey";
        break;
    case 1:
        apiUrl = 'http://192.168.1.83/escandallo/escandallo_api';
        apiKey = "JustAnotherRandomApiKey";
        break;
}

export const GlobalConfig = {
    appVersion: REACT_APP_VERSION_NUMBER,
    appVersionDate: moment(REACT_APP_VERSION_DATE).isValid() ? REACT_APP_VERSION_DATE : moment(new Date()).format("DD/MM/YYYY"),
    apiUrl,
    apiKey,

    // masterServer: 'http://localhost/JoseSanchisDev/DashboardController/api',
    // masterApp: '43F7A869E2F95',

    basename: '/',

    appName: '',
    breakpointWidth: 992, //More info: https://getbootstrap.com/docs/5.1/layout/breakpoints/

    //Tables
    perPage: 10,

    theme: {
        mainLayout: 'white',
        generalLayout: 'light',
    },
}
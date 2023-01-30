import { BASE_PATHS } from "./Configuration";

export const DEFAULT_PATH = '/';

//Auth
export const AUTH_PATH = BASE_PATHS.Auth;
export const LOGIN_PATH = `${AUTH_PATH}/login`;
export const SIGN_UP_PATH = `${AUTH_PATH}/signup`;

//App
export const APP_PATH = BASE_PATHS.App;

//Recors
export const RECORDS_PATH = `${APP_PATH}/record/all`;

//Orders
export const ORDERS_PATH = `${APP_PATH}/order/all`;
export const NEW_ORDER_PATH = `${APP_PATH}/order/new`;
export const EDIT_ORDER_PATH = `${APP_PATH}/order/edit/:guid`;

//Machines
export const MACHINES_PATH = `${APP_PATH}/machine/all`;
export const NEW_MACHINE_PATH = `${APP_PATH}/machine/new`;
export const EDIT_MACHINE_PATH = `${APP_PATH}/machine/edit/:guid`;

//Users
export const USERS_PATH = `${APP_PATH}/user/all`;
export const NEW_USER_PATH = `${APP_PATH}/user/new`;
export const EDIT_USER_PATH = `${APP_PATH}/user/edit/:guid`;

//Settings
export const SETTINGS_PATH = `${APP_PATH}/settings/`;

export const SETTINGS_INPUTS_PATH = `${APP_PATH}/settings/inputs`;
export const SETTINGS_NEW_INPUT_PATH = `${APP_PATH}/settings/new`;
export const SETTINGS_EDIT_INPUT_PATH = `${APP_PATH}/settings/edit/:guid`;

export const SETTINGS_LOGS_PATH = `${APP_PATH}/settings/logs`;
export const SETTINGS_VIEW_LOG_PATH = `${APP_PATH}/settings/view-log/:guid`;

//NotFound
export const NOT_FOUND_PATH = '*'
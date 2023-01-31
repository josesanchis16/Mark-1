import { BASE_PATHS } from "./Configuration";

export const DEFAULT_PATH = '/';

//Auth
export const AUTH_PATH = BASE_PATHS.Auth;
export const LOGIN_PATH = `${AUTH_PATH}/login`;
export const SIGN_UP_PATH = `${AUTH_PATH}/signup`;

//App
export const APP_PATH = BASE_PATHS.App;

//Users
export const USERS_PATH = `${APP_PATH}/user/all`;
export const NEW_USER_PATH = `${APP_PATH}/user/new`;
export const EDIT_USER_PATH = `${APP_PATH}/user/edit/:guid`;

//NotFound
export const NOT_FOUND_PATH = '*'
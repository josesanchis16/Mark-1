import { BASE_PATHS } from "./Configuration";

export const DEFAULT_PATH = '/';

//Auth
export const AUTH_PATH = BASE_PATHS.Auth;
export const LOGIN_PATH = `${AUTH_PATH}/login`;
export const SIGN_UP_PATH = `${AUTH_PATH}/signup`;
export const FORGOT_PASSWORD_PATH = `${AUTH_PATH}/forgot-password`;

//App
export const APP_PATH = BASE_PATHS.App;
export const SECTION_1_PATH = `${APP_PATH}/section-1`;
export const SECTION_2_PATH = `${APP_PATH}/section-2`;
export const SECTION_3_PATH = `${APP_PATH}/section-3`;
export const SECTION_4_PATH = `${APP_PATH}/section-4`;

//NotFound
export const NOT_FOUND_PATH = '*'
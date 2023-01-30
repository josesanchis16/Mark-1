import { GlobalConfig } from "../Configuration";

const BASE_URL = GlobalConfig.apiUrl;

export const Endpoints = (folder) => {

    const url = `${BASE_URL}/${folder}`;

    return ({
        //Auth
        LOGIN: `${url}/login.php`,
        FORGOT_PASSWORD: `${url}/passwordRecovery.php`,
        GET_RECOVERY_CODE: `${url}/getRecoveryCode.php`,
        RESET_PASSWORD: `${url}/resetPassword.php`,
        CHECK_USER: `${url}/checkUser.php`,

        //Generic
        CREATE: `${url}/create.php`,
        GET: `${url}/get.php`,
        GET_ALL: `${url}/getAll.php`,
        UPDATE: `${url}/update.php`,
        DELETE: `${url}/delete.php`,

        //Order
        SEARCH: `${url}/search.php`
    })
}

export const FolderName = {
    USER: 'User',
    INPUT: 'Input',
    LOGS: 'Logs',
    MACHINES: 'Machine',
    ORDER: 'Order',
}
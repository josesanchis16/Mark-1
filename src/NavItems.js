import { mdiAbacus, mdiAccountGroupOutline, mdiCardTextOutline, mdiCog, mdiExitRun, mdiFileDocumentMultipleOutline, mdiFormatListBulleted, mdiHammerScrewdriver } from '@mdi/js';
import { MACHINES_PATH, ORDERS_PATH, RECORDS_PATH, SETTINGS_INPUTS_PATH, SETTINGS_LOGS_PATH, SETTINGS_PATH, USERS_PATH } from "./Paths";
import { logout } from './Utils/GeneralFunctions';

const getItem = (title, path, icon = null, children = null, onClick = null) => ({ id: title.replace(' ', '-').toLowerCase(), title, icon, path, onClick, children });

//Items
const recordsItems = getItem('Registros', RECORDS_PATH, mdiFileDocumentMultipleOutline);
const orderItems = getItem('Orden de trabajo', ORDERS_PATH, mdiAbacus);
const machinesItems = getItem('Máquinas', MACHINES_PATH, mdiHammerScrewdriver);
const userItems = getItem('Usuarios', USERS_PATH, mdiAccountGroupOutline);

const inputsItems = getItem("Entradas", SETTINGS_INPUTS_PATH, mdiCardTextOutline)

const logsItems = getItem("Logs", SETTINGS_LOGS_PATH, mdiFormatListBulleted);

const adminSettingsItems = getItem('Ajustes', SETTINGS_PATH, mdiCog, [inputsItems]);
const superAdminSettingsItems = getItem('Ajustes', SETTINGS_PATH, mdiCog, [inputsItems, logsItems]);

const logOutItem = getItem('Salir', null, mdiExitRun, null, () => logout());

export const SuperAdminNavItems = [
    recordsItems,
    orderItems,
    machinesItems,
    userItems,
    superAdminSettingsItems,
    logOutItem
]

export const AdminNavItems = [
    recordsItems,
    orderItems,
    machinesItems,
    userItems,
    adminSettingsItems,
    logOutItem
]

export const NavItems = [
    recordsItems,
    orderItems,
    adminSettingsItems,
    logOutItem
]
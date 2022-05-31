import { mdiExitRun, mdiNumeric1, mdiNumeric2 } from '@mdi/js';
import { SECTION_1_PATH, SECTION_2_PATH } from "./Paths";

const getItem = (title, path, icon = null, onClick = null) => ({ id: title.replace(' ', '-').toLowerCase(), title, icon, path, onClick });

//Items
const section1Item = getItem('Dashboard', SECTION_1_PATH, mdiNumeric1);
const section2Item = getItem('Color view', SECTION_2_PATH, mdiNumeric2);
const section3Item = getItem('Sign out', null, mdiExitRun, () => window.location.href = "/auth/login");

export const NavItems = [
    section1Item,
    section2Item,
    section3Item
]
import { mdiGrid, mdiNumeric1, mdiNumeric2 } from '@mdi/js';
import { SECTION_1_PATH, SECTION_2_PATH } from "./Paths";

const getItem = (title, path, icon = null, onClick = null) => ({ id: title.replace(' ', '-').toLowerCase(), title, icon, path, onClick });

//Items
const section1Item = getItem('Section 1', SECTION_1_PATH, mdiNumeric1);
const section2Item = getItem('Section 2', SECTION_2_PATH, mdiNumeric2);
const section3Item = getItem('Section 3', null, mdiGrid, () => console.log('Hei'));

export const NavItems = [
    section1Item,
    section2Item,
    section3Item
]
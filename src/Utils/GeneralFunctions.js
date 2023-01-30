import { LOGIN_PATH } from "../Paths";
import { getSetCurrentPageTitleAction } from "../Redux/Reducers/Config/Actions";
import store from "../Redux/store";
import { StorageKeys } from "./StorageKeys";

export const setCurrentPath = () => {
    // const history = useHistory();
    // store.dispatch(getSe)
}

export const encryptString = (string) => {
    const dict = 'abcdefghijklmnopqrstuvwxz1234567890';
    const hash = 16;

    let newString = '';
    for (let i = 0; i < string.length; i++) {
        const letter = string[i];
        const index = dict.indexOf(letter);
        const newLetter = dict[(index + hash) % dict.length];
        newString += newLetter;
    }
    newString = window.btoa(newString);
    return newString.slice(1, newString.length);
}

export const equals = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

export const showModal = (modal, extraData = {}) => {
    window.$(`.modal`).modal('hide');
    let modalEl = window.$(`#${modal}`);
    Object.keys(extraData).forEach((key) => {
        let element = extraData[key];
        modalEl.data(key, element);
    })
    modalEl.modal('show');
}

export const hideModals = (callback) => {
    window.$(`.modal`).modal('hide', callback);
}

export const logout = () => {
    localStorage.removeItem(StorageKeys.TOKEN);
    localStorage.removeItem(StorageKeys.ROLE);
    hideModals();
    window.location.href = `${window.location.protocol}//${window.location.host}${LOGIN_PATH}`
}

export const getTitle = (title) => {
    store.dispatch(getSetCurrentPageTitleAction(title));
    return title;
}

export const numberWithCommas = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}

export const getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
        return {
            style: {
                'background-color': rowInfo.index % 2 === 0 ? '#f3f3f3' : '#f9f9f9'
            }
        }
    }
    return {};
}

export const getDefaultPropsForColumns = (id, title) => {
    let obj = {
        id,
        sortable: false,
        resizable: false,
    };
    const Header = () => (<b>{title}</b>)
    obj = { ...obj, Header };
    return obj;
}
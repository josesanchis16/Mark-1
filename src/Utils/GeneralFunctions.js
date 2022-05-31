import { getSetCurrentPageTitleAction } from "../Redux/Reducers/Config/Actions";
import store from "../Redux/store";

export const setCurrentPath = () => {
    // const history = useHistory();
    // store.dispatch(getSe)
}

export const equals = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

export const showModal = (modal) => {
    window.$(`.modal`).modal('hide');
    window.$(`#${modal}`).modal('show');
}

export const hideModals = (callback) => {
    window.$(`.modal`).modal('hide', callback);
}

export const getTitle = (title) => {
    store.dispatch(getSetCurrentPageTitleAction(title));
    return title;
}
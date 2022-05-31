import { CAN_SCREEN_GO_BACK, CURRENT_PAGE_TITLE, SET_CURRENT_PATH, SET_PREVIOUS_PATH, TOGGLE_SIDEBAR } from "./Types";

export const getSetCurrentPathAction = payload => ({
    type: SET_CURRENT_PATH,
    payload
});

export const getSetPreviousPathAction = payload => ({
    type: SET_PREVIOUS_PATH,
    payload
})

export const getToggleSideBarAction = payload => ({
    type: TOGGLE_SIDEBAR,
    payload
})

export const getSetCurrentPageTitleAction = payload => ({
    type: CURRENT_PAGE_TITLE,
    payload
})

export const getCanScreenGoBackAction = payload => ({
    type: CAN_SCREEN_GO_BACK,
    payload
})
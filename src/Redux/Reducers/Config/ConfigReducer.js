import { CAN_SCREEN_GO_BACK, CURRENT_PAGE_TITLE, SET_CURRENT_PATH, SET_PREVIOUS_PATH, TOGGLE_SIDEBAR } from "./Types"

const init = {
    currentPath: '',
    previousPath: '',
    currentPageTitle: '',
    sidebarOpened: false,
    showBackButton: 's'
}

export const ConfigReducer = (state = init, { type, payload }) => {
    switch (type) {
        case SET_CURRENT_PATH:
            return {
                ...state,
                currentPath: payload
            }
        case SET_PREVIOUS_PATH:
            return {
                ...state,
                previousPath: payload
            }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarOpened: payload !== undefined ? payload : !state.sidebarOpened
            }
        case CURRENT_PAGE_TITLE:
            return {
                ...state,
                currentPageTitle: payload
            }
        case CAN_SCREEN_GO_BACK:
            return {
                ...state,
                showBackButton: payload
            }
        default: return { ...state }
    }
}
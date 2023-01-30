import { SET_USER } from "./Types"

const init = {
    email: '',
    guid: '',
    profile: {}
}

export const UserReducer = (state = init, { type, payload }) => {
    switch (type) {
        case SET_USER:
            return {
                email: payload.email,
                guid: payload.guid,
                profile: payload.profile
            }
        default: return { ...state }
    }
}
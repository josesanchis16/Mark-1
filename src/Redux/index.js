import { combineReducers } from "redux";
import { ConfigReducer as Config } from "./Reducers/Config/ConfigReducer";
import { UserReducer as User } from "./Reducers/User/UserReducer";

const reducersIndex = combineReducers({
    Config,
    User
});

export default reducersIndex
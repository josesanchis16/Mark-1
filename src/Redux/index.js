import { combineReducers } from "redux";
import { ConfigReducer as Config } from "./Reducers/Config/ConfigReducer";

const reducersIndex = combineReducers({
    Config
});

export default reducersIndex
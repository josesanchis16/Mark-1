import { createStore } from "redux";
import reducersIndex from ".";

const store = createStore(
    reducersIndex,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
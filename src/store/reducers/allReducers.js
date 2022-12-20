import {combineReducers} from "redux";
import configReducer from "./configReducer";
import tokenReducer from "./TokenReducer";
import authReducer from "./authReducer";


export const allReducers = combineReducers({
    config: configReducer,
    token: tokenReducer,
    auth:authReducer,
});


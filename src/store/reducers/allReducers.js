import {combineReducers} from "redux";
import configReducer from "./configReducer";


export const allReducers = combineReducers({
    config: configReducer,
});


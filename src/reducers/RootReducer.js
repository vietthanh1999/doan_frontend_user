import userReducer from "./UserReducer";

const { combineReducers } = require("redux");

const mainReducer = combineReducers({
    'user': userReducer,
})

export default mainReducer
const authReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_AUTH":
            state = action.value
            break
    }
    return state
};
export default authReducer;

const tokenReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            state = action.value
            break
    }
    return state
};
export default tokenReducer;

const configReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_THEME":
            const theme = action.value
            state = {
                ...state, theme
            }
            break
        case "SET_INDEX_TAB":
            const tab = action.value
            state = {
                ...state, tab
            }
            break
    }
    return state
};
export default configReducer;

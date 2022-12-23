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
        case "SET_API":
            const api = action.value
            state = {
                ...state, api
            }
            break
        case "SET_EXPO":
            const expo = action.value
            state = {
                ...state, expo
            }
            break
    }
    return state
};
export default configReducer;

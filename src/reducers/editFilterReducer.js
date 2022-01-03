
// Actions
const HIDE_EDIT_FILTER = "HIDE_EDIT_FILTER";
const SHOW_EDIT_FILTER = "SHOW_EDIT_FILTER";

// Action creators
export const hideEditFilter = () => ({
    type: HIDE_EDIT_FILTER,
})

export const showEditFilter = () => ({
    type: SHOW_EDIT_FILTER,
})

// Initial state
const editFilterVisible = {
    modalVisible: false,
}

// reducer
const editFilterReducer = (state = editFilterVisible, action) => {
    switch (action.type) {
        case HIDE_EDIT_FILTER:
            return {
                ...state,
                modalVisible: false
            }
        case SHOW_EDIT_FILTER:
            return {
                ...state,
                modalVisible: true
            }
        default:
            return state
    }
}

export default editFilterReducer
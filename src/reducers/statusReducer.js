
// Actions
const TOGGLE_ACTIVE = "TOGGLE_ACTIVE";
const TOGGLE_SUPER_ACTIVE = "TOGGLE_SUPER_ACTIVE";
const TOGGLE_BORED = "TOGGLE_BORED";

// Action creators
export const toggleActive = () => ({
    type: TOGGLE_ACTIVE,
})

export const toggleSuperActive = () => ({
    type: TOGGLE_SUPER_ACTIVE,
})

export const toggleBored = () => ({
    type: TOGGLE_BORED
})

// Initial state
const initialState = {
    active: true,
    superActive: true,
    bored: true
}

// reducer
const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ACTIVE:
            return {
                ...state,
                active: !state.active
            }
        case TOGGLE_SUPER_ACTIVE:
            return {
                ...state,
                superActive: !state.superActive
            }
        case TOGGLE_BORED:
            return {
                ...state,
                bored: !state.bored
            }
        default:
            return state
    }
}

export default statusReducer
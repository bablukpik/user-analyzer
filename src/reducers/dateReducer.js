
// Actions
const START_DATE = "START_DATE";
const END_DATE = "END_DATE";
var moment = require('moment');
const start = new Date(2016, 0, 1)
const end = new Date(2017, 0, 1)

// Action creators
export const changeStartDate = (payload) => ({
    type: START_DATE,
    payload
})

export const changeEndDate = (payload) => ({
    type: END_DATE,
    payload
})


// Initial state
const selectedDate = {
    startDate: moment(start).format("D MMMM YYYY"),
    endDate: moment(end).format("D MMMM YYYY")
}

// reducer
const rootReducer = (state = selectedDate, action) => {
    switch (action.type) {
        case START_DATE:
            return {
                ...state,
                startDate: moment(action.payload).format("D MMMM YYYY")
            }
        case END_DATE:
            return {
                ...state,
                endDate: moment(action.payload).format("D MMMM YYYY")
            }
        default:
            return state
    }
}

export default rootReducer
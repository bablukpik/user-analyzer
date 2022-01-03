import { getData } from "../data/dataHandler";

// Actions
const GET_DATA = "GET_DATA";

// Action creators
export const setGlobalData = (payload) => ({
    type: GET_DATA,
    payload    
})

const globalData = []

const determineType = (inRangeMealCount, precedingMealCount) => {
    if (inRangeMealCount < 5) {
        //lets check if the user was active before the preceding period
        if (precedingMealCount > 4 && inRangeMealCount > 0) {
            return "Bored"

        } else {
            return "Not Bored"
        }


    } else if (inRangeMealCount > 4 && inRangeMealCount < 11) {
        //this is active user
        return "Active"

    } else {
        //this is super active user
        return "Super Active"


    }
}
const getDayIdsInSelectedPeriod = (arr, startDate, endDate, dataObject) => {

    var dates = arr.filter(function (a) {
        var aDate = new Date(a);

        return aDate >= startDate && aDate <= endDate;
    })
    var result = [];
    dates.forEach((key) => {
        result.push(dataObject.dateToDayId[key])
    })
    return result;


}
const getDayIdsInPrecedingPeriod = (arr, startDate, dataObject) => {

    var dates = arr.filter(function (a) {
        var aDate = new Date(a);

        return aDate < startDate;
    })
    var result = [];
    dates.forEach((key) => {
        result.push(dataObject.dateToDayId[key])
    })
    return result;


}
const getFilteredData = (obj) => {
    
    var data = getData();
    var searchResult = [];
    data.forEach(element => {
        var dateToDayIdKeys = Object.keys(element.dateToDayId)
        var daysWithDetailsKeys = Object.keys(element.daysWithDetails)
        var inRangeMealCount = 0;
        var precedingMealCount = 0;
        var dayIdsInSelectedPeriod = getDayIdsInSelectedPeriod(dateToDayIdKeys, obj.startDate, obj.endDate, element)
        //this array contains day ids of those days that falls in the range

        var dayIdsInPrecedingPeriod = getDayIdsInPrecedingPeriod(dateToDayIdKeys, obj.startDate, element)
        //this array contains day ids of those days that preceeds the start date





        //pushing the dayIds into inRangeDayIds
        daysWithDetailsKeys.forEach((parentDayId) => {

            dayIdsInSelectedPeriod.forEach((childDayId) => {
                if (childDayId == parentDayId) {
                    var mealCountInDayId = Object.keys(element.daysWithDetails[parentDayId].details.mealsWithDetails)
                    inRangeMealCount = inRangeMealCount + mealCountInDayId.length;
                }
            })

            dayIdsInPrecedingPeriod.forEach((childDayId) => {
                if (childDayId == parentDayId) {
                    var mealCountInDayId = Object.keys(element.daysWithDetails[parentDayId].details.mealsWithDetails)
                    precedingMealCount = precedingMealCount + mealCountInDayId.length;
                }
            })
        })

        searchResult.push({
            name: element.userName,
            type: determineType(inRangeMealCount, precedingMealCount),
            inRangeMealCount: inRangeMealCount,
            precedingMealCount: precedingMealCount,
            pictureUrl: element.pictureUrl,

        })


    });

    var result = searchResult.filter(x => x.type !== "Not Bored")

    if (!obj.bored) {
        result = result.filter(x => x.type !== "Bored")
    }
    if (!obj.active) {
        result = result.filter(x => x.type !== "Active")
    }

    if (!obj.superActive) {
        result = result.filter(x => x.type !== "Super Active")
    }
    return result;


}

// reducer
const rootReducer = (state = globalData, action) => {
    switch (action.type) {
        case GET_DATA:
            return getFilteredData(action.payload);        
        default:
            return state
    }
}

export default rootReducer
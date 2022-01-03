import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import statusReducer from './statusReducer'
import dateReducer from './dateReducer'
import editFilterReducer from './editFilterReducer'

export default combineReducers({
    dataReducer: dataReducer,
    statusReducer: statusReducer,
    dateReducer: dateReducer,
    editFilterReducer: editFilterReducer
})
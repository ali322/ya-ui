import { combineReducers } from 'redux'

function noopReducer(state = {}, action) {
    return state
}

const rootReducer = combineReducers({
    noopReducer
})

export default rootReducer

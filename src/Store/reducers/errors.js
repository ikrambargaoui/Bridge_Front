import { ADD_ERROR, REMOVE_ERROR } from "../Actions/actionTypes"

export default (state = { message: "" }, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return {
                ...state, message: action.error
            }
        case REMOVE_ERROR:
            return {
                ...state, message: ""
            }
        default:
            return state
    }
}
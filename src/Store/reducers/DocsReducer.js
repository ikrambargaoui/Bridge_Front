import { GET_DOCUMENTS } from '../Actions/actionTypes';

const DEFAULT_STATE = {
    DocumentsOfUser: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_DOCUMENTS:
            return {
                DocumentsOfUser: action.docs
            }
        default:
            return state
    }
}
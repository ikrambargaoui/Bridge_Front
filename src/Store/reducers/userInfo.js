import { GET_USER } from '../Actions/actionTypes';
import isEmpty from 'is-empty';

const DEFAULT_STATE = {
    user: {}
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                user: action.user
            }
        default:
            return state
    }
}
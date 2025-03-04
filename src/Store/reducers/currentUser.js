import { SET_CURRENT_USER } from '../Actions/actionTypes';
import isEmpty from 'is-empty';

const DEFAULT_STATE = {
    isAuthenticated: false
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
              isAuthenticated: !isEmpty(action.accessToken)

            }

        default:
            return state
    }
}
import { GET_COLUMN_CONFIG  } from '../Actions/actionTypes';

const DEFAULT_STATE = {
   cols: []
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_COLUMN_CONFIG :
            return {
                cols:action.cols
            }

        default:
            return state
    }
}
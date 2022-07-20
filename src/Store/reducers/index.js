import { combineReducers } from 'redux';
//import ThemeOptions from './ThemeOptions';
import errors from './errors'
import currentUser from './currentUser'
import Docs from './DocsReducer'
import userInfo from './userInfo';
import cols from './colsReducer'



// Old Store configuration

// export default {
//     ThemeOptions,
//     errors,
//     currentUser
// };

// New Store configuration

const rootReducer = combineReducers({
    errors,
    currentUser,
    Docs,
    userInfo,
    cols
})

export default rootReducer;

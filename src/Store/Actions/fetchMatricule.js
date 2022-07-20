import axios from "axios";

import { MATRICULE } from "./actionTypes";


export const getDocsOfUser = (matricule) => dispatch => {
            dispatch({
                type: MATRICULE,
                MAT: matricule
            });
     

}


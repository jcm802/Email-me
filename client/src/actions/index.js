import axios from 'axios';
// Type for redux action
import { FETCH_USER } from './types';

// Action Creator - Purpose: To fetch the current user for storage in redux store
export const fetchUser = () => // Automatic return
    // Action with redux thunk involving dispatch function sent to all reducers - Purpose: We do not want to return an action immediately because we have to wait until the async request is complete
    async dispatch => { // Single argument function
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data }); // promise removed, special dispatch function provided by thunk
    };

// ---- Before Refactor ----
// export const fetchUser = () => {
//     return function(dispatch) {
//       axios
//         .get('/api/current_user')
//         .then(res => dispatch({ type: FETCH_USER, payload: res }));
//     };
//   };

// Action Creator - Purpose: Take the token recieved from stripe and send it to the back end
// Post request because we are sending information to be stored on the back end
export const handleToken = (token) => 
    async dispatch => {
        const res = await axios.post('/api/stripe', token);
        // we are referencing the user when dispatching this action, so we are using the same type as the previous action creator
        dispatch({ type: FETCH_USER, payload: res.data});
    };
  
const initialState = {

    token: null,
    userId :null,
    isLoggedIn: false

};
function authReducer(
    state = initialState,
    action
) {

    switch (action.type) {

        case "LOGIN":

            return {

                token: action.payload.token,
                userId: action.payload.userId,
                isLoggedIn: true

            };


        case "LOGOUT":

            return {

                token: null,
                userId: null,
                isLoggedIn: false

            };


        default:

            return state;

    }

}


export default authReducer;
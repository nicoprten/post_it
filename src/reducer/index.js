const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'LOG_USER':
            return{
                    ...state,
                    user: null
                }
        case 'LOGOUT_USER':
            return{
                    ...state,
                    user: null
                }
        case 'CREATE_ACCOUNT':
            return{
                    ...state,
                    user: null
                }
        case 'SET_USER':
            console.log(action.payload)
            localStorage.setItem('user', JSON.stringify(action.payload))
            return{
                    ...state,
                    user: action.payload
                }
        default:
            return state;
    }
}
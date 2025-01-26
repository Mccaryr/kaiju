import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: {
        username: "",
        userId: null,
        firstName: "",
        lastName: "",
    }
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<any>) => {
            if(action.payload) {
                const {user, jwt} = action.payload
                localStorage.setItem("token", jwt);
                state.user = {username: user.username, userId: user.userId, firstName: user.firstName, lastName: user.lastName}
            }
            state.isLoggedIn = true
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.isLoggedIn = false;
        }
    },
})

export const {setIsLoggedIn, logout} = authSlice.actions
export default authSlice.reducer;
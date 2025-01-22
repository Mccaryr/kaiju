import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<string | void>) => {
            if(action.payload) {
                localStorage.setItem("token", action.payload);
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
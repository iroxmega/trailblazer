import { createSlice } from '@reduxjs/toolkit'

export interface IauthState {
    authData: {
        username: string,
        password: string,
    }
    logSuccess: boolean,
}

const initialState: IauthState = {
    authData: {
        username: '',
        password: ''
    },
    logSuccess: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        successfulLogin: (state, action) => {
            state.authData.username = action.payload.username
            state.authData.password = action.payload.password
            state.logSuccess = true
        },
        logOut: (state) => {
            state.logSuccess = false
            state.authData = {
                username: '',
                password: ''
            }
        }
    },
})


export const getAuthStatus = (state) => state.auth.logSuccess;
export const getAuthData = (state) => state.auth.authData;
// Action creators are generated for each case reducer function
export const { successfulLogin } = authSlice.actions

export default authSlice.reducer
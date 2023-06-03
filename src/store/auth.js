const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    username: "",
    email: "",
    password: "",
    rePassword: "",
    isAuth: false
}

const authSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        setRePassword(state, action) {
            state.rePassword = action.payload
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload
        }
    }
})


export const { setUsername, setEmail, setPassword, setRePassword, setIsAuth } = authSlice.actions
export default authSlice.reducer
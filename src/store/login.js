const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    emailLog: "",
    passwordLog: ""
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogEmail(state, action) {
            state.emailLog = action.payload
        },
        setLogPassword(state, action) {
            state.passwordLog = action.payload
        },
    }
})

export const { setLogEmail, setLogPassword } = loginSlice.actions
export default loginSlice.reducer
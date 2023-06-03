import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        username: "",
        email: "",
        password: "",
        rePassword: "",
        isAuth: false,
        id: ""
    }
}

const userSlice = createSlice({
    name: "user info",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = { ...action.payload }
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
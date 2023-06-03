const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    title: "",
    image: null,
    category: "techElec",
    describe: "",
    phone: "",
    price: ""
}

const orderSlice = createSlice({
    name: "order state",
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setDescribe: (state, action) => {
            state.describe = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setPrice: (state, action) => {
            state.price = action.payload
        }
    }
})

export const { setImage, setCategory, setDescribe, setPhone, setPrice, setTitle } = orderSlice.actions
export default orderSlice.reducer
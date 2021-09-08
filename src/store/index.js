import {createSlice, configureStore, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchDevsData = createAsyncThunk("devs/fetchEmployeesData",
async () => {
        try {
            const response = await fetch('http://localhost:3003/devs')
            const data = await response.json()
            return data
        }
        catch (error) {
            throw Error(error)
        }
    }
)


export const fetchTaskData = createAsyncThunk("tasks/fetchTaskData",
async () => {
        try {
            const response = await fetch('http://localhost:3003/tasks')
            const data = await response.json()
            return data
        }
        catch (error) {
            throw Error(error)
        }
    }
)
const devsSlice = createSlice({
    name: "devs",
    initialState: {
        isLoading: false,
        devs: [],
        error: false
    },
    reducers: {},
    extraReducers: {
        [fetchDevsData.pending]: (state) => {
            state.isLoading = "PENDING"
        },
        [fetchDevsData.fulfilled]: (state, action) => {
            state.isLoading = "FULFILLED";
            state.devs = action.payload

        },
        [fetchDevsData.rejected]: (state) => {
            state.isLoading = "REJECTED";
            state.error = true
        },
    }
})


const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        isLoading: false,
        tasks: [],
        error: false
    },
    reducers: {},
    extraReducers: {
        [fetchTaskData.pending]: (state) => {
            state.isLoading = "PENDING"
        },
        [fetchTaskData.fulfilled]: (state, action) => {
            state.isLoading = "FULFILLED";
            state.tasks = action.payload

        },
        [fetchTaskData.rejected]: (state) => {
            state.isLoading = "REJECTED";
            state.error = true
        },
    }
})



const initialToken = localStorage.getItem("token")
const initialRenderFadePanel = localStorage.getItem("hasRenderFadeOutPannel")

const authSlice = createSlice({
    name:"auth",
    initialState: {token : initialToken, renderedFadeOutPanel :initialRenderFadePanel},
    reducers:{
        login(state, action){
           state.token = action.payload
           localStorage.setItem("token", action.payload)
           localStorage.setItem("hasRenderFadeOutPannel", true)
        },
        logout(state){
            localStorage.removeItem("token")
            state.token = null
            localStorage.removeItem("hasRenderFadeOutPannel")
        }
    }
})

export const authActions = authSlice.actions
const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        devs: devsSlice.reducer,
        tasks: taskSlice.reducer
    }
})

export default store
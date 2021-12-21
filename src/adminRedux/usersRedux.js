import {createSlice} from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isFetching: false,
        error:false,
    },
    reducers: {
        //GET ALL
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        },


        //UPDATE USER
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users[state.users.findIndex(item => item._id === action.payload.id)] = action.payload.user;
        },
        updateUserFailure: (state) => {
            state.isFetching = true;
            state.error = true;
        },
    },
});

export const { 
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} = usersSlice.actions;

export default usersSlice.reducer;
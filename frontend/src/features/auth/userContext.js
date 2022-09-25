import { createContext, useState } from "react";

// import {
//     createSlice,
//     createAsyncThunk
// } from '@reduxjs/toolkit';

// // get user from local storage


const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};

export default userContext;

// const initialState = {
//     user: user?user:null,
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message:""
// }

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         reset: (state) => {
//             state.isError = false;
//             state.isSuccess = false;
//             state.message = "";
//             state.isLoading = false;
//         }
//     },
//     extraReducers:()=> {
//     }
// });

// export const { reset } = authSlice.actions;

// export default authSlice.reducer;

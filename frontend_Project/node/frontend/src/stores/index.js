import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = { counter: 0, showNum: true }

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showNum = !state.showNum
        }
    }
})

/* ログインstate */
const initialAuthState = {
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuth = true;
        },
        logout(state) {
            state.isAuth = false;
        },
    },
});

// 複数のreducerを一つにまとめている
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
    },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;   
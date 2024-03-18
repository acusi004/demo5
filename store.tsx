import {configureStore, createSlice} from "@reduxjs/toolkit";



const cartSlice= createSlice({
  name: 'photo',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    takephoto: (state, action) => {
      // payload la tham so chua du lieu dc gui vao ham addItem thogn qua dispatch
      // @ts-ignore
      state.items.push(action.payload);
    },
    library: (state, action) => {
      state.items = [];
    },
  },
})

export const store = configureStore({
  reducer: {
    image: cartSlice.reducer,
  },
})
export const {takephoto,library } = cartSlice.actions


export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

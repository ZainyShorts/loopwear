import { createSlice } from '@reduxjs/toolkit';

export interface ProductState {
    isOpen: boolean;
}

// const isMobile = () => {
//     console.log(navigator.userAgent)
//     return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
// };

const initialState: ProductState = {
    isOpen: false,
};



export const productSlice = createSlice({
    name: 'chatbox',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isOpen = !state.isOpen;
          },
    },
});

export const { toggleSidebar } = productSlice.actions;

export default productSlice.reducer
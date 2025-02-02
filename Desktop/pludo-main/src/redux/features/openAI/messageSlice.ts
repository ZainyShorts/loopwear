import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Message { 
    id: string,
    sender: string,
    content: string,
}
export interface messageState {
    messages: Message[];
} 


const initialState: messageState = {
    messages: [],
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
       sendMessage : (state, action : PayloadAction<Message>) => { 
         state.messages.push(action.payload) 
       },  
     
    }, 

});

export const { sendMessage } = messageSlice.actions;
export default messageSlice.reducer;
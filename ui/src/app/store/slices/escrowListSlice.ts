import { BasicEscrow, EscrowListState } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


const initialState: EscrowListState = {
    escrowList: []
}

export const escrowListSlice = createSlice({
    name: 'escrowList',
    initialState,
    reducers: {
        addEscrow: (state, action: PayloadAction<BasicEscrow>) => {
            state.escrowList.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addEscrow } = escrowListSlice.actions
export const selectCount = (state: RootState) => state.escrowList

export default escrowListSlice.reducer
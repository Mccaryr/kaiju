import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ModalState {
    isVisible: boolean,
    modalType: string,
    modalProps: {}
}

const initialState: ModalState = {
    isVisible: false,
    modalType: "",
    modalProps: {}
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{modalType: string, modalProps?: any }>) => {
            state.isVisible = true
            state.modalType = action.payload.modalType
            state.modalProps = action.payload.modalProps || {}
        },
        closeModal: (state) => {
            state.isVisible = false;
            state.modalType = "";
            state.modalProps = {}
        }
    },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
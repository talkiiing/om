import { createSlice } from '@reduxjs/toolkit'
import RequestModel from '../../models/request.model'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    history: [] as RequestModel[]
  },
  reducers: {
    saveRequest: (state, action) => {
      state.history = [...state.history, ...action.payload]
    },
    clearRequestHistory: (state, action) => {
      state.history = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveRequest, clearRequestHistory } = historySlice.actions

export default historySlice.reducer

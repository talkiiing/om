import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const StorageKeySettings = 'cache'

export interface CacheStoreModel {
  [keyName: string]: {
    createdAt: number
    data: any
  }
}

interface PayloadInterface {
  key: string
  data: any
}

export const cacheSlice = createSlice({
  name: 'cache',
  initialState: {} as CacheStoreModel,
  reducers: {
    save: (state, action: PayloadAction<PayloadInterface>) => {
      state = {
        ...state,
        [action.payload.key]: {
          createdAt: +new Date(),
          data: action.payload.data,
        },
      }
      localStorage.setItem(StorageKeySettings, JSON.stringify(state))
    },
  },
})

// Action creators are generated for each case reducer function
export const { save } = cacheSlice.actions

export default cacheSlice.reducer

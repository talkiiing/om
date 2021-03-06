import { configureStore } from '@reduxjs/toolkit'
import { settingsSlice } from './settings/settings'
import { historySlice } from './history/history'
import { cacheSlice } from './cache/cache'

export default configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    history: historySlice.reducer,
    cache: cacheSlice.reducer,
  },
})

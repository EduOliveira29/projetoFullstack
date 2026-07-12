// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { api } from './service/api' // importe sua api criada

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

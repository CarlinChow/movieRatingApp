import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from '../features/auth/authSlice'
import { moviesApi } from '../features/movies/moviesApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
})

setupListeners(store.dispatch)
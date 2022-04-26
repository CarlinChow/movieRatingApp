import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  user: user ? user : null
}

// register user
export const register = createAsyncThunk('auth/register', 
  async(user, thunkAPI) => {
    try{
      return await authService.register(user)
    } catch(error) { 
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//  login user
export const login = createAsyncThunk('auth/login',
  async(user, thunkAPI) => {
    try{
      return await authService.login(user)
    } catch(error){
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
 

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, {payload})=> {
        state.isLoading = false
        state.isSuccess = true
        state.user = payload
      })
      .addCase(register.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, {payload})=> {
        state.isLoading = false
        state.isSuccess = true
        state.user = payload
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
        state.user = null
      })
  }
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer
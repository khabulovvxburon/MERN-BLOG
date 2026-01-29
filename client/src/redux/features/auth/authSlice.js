import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    status: null,
}

// Register
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                username,   
                password,
            })

            localStorage.setItem('token', data.token)
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Register error'
            )
        }
    }
)

// Login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/login', {
                username,
                password,
            })

            localStorage.setItem('token', data.token)
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login error'
            )
        }
    }
)

// Get current user
export const getMe = createAsyncThunk(
    'auth/getMe',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/auth/me')
            return data
        } catch (error) {
            return rejectWithValue('Not authorized')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.status = action.payload
            })

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.status = action.payload
            })

            // GET ME
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(getMe.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)
export const { logout } = authSlice.actions
export default authSlice.reducer

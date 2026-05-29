import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser } from '../../services/authService.js'
import toast from 'react-hot-toast'

// Login thunk
export const login = createAsyncThunk(
    'auth/login',
    async (form, { rejectWithValue }) => {
        try {
            const data = await loginUser(form)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            toast.success(`Welcome back, ${data.user.name}!`)
        return data.user
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed'
            toast.error(message)
        return rejectWithValue(message)
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (form, { rejectWithValue }) => {
        try {
            const data = await registerUser(form)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            toast.success(`Welcome to Royal Gold, ${data.user.name}!`)
            return data.user
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed'
            toast.error(message)
        return rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.error = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
            clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
        // Login
        .addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // Register
        .addCase(register.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const initialState = {
    user: getUserFromLocalStorage(),
    forget: "",
    reset: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue({ message });
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await authService.logout();
        return {};
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue({ message });
      }
});

export const forgetPassword = createAsyncThunk('auth/forget-password', async (data, thunkAPI) => {
    try {
        return await authService.forgetPassword(data);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue({ message });
    }
});

export const resetPassword = createAsyncThunk('auth/reset-password', async (data, thunkAPI) => {
    try {
        return await authService.resetPassword(data);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue({ message });
    }
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.user = action.payload;
                state.message = '';
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isSuccess = false;
                state.isError = false;
                state.message = '';
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            })
            .addCase(logout.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(forgetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.forget = action.payload;
                state.message = '';
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.reset = action.payload;
                state.message = '';
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

export default authSlice.reducer;

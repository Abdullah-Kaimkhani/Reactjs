// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { Save } from '@mui/icons-material';

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const collectionName = role === 'admin' ? 'admins' : 'users';
      const userDoc = await getDoc(doc(db, collectionName, uid));
      if (!userDoc.exists()) {
        throw new Error("Role mismatch");
      }
      const userData = userDoc.data();
      if (userData.role !== role) {
        throw new Error("Role mismatch");
      }
      localStorage.setItem('userData', JSON.stringify(userData));
      return { uid, ...userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing up a user
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userObj = { name, email, role };
      const collectionName = role === 'admin' ? 'admins' : 'users';
      await setDoc(doc(db, collectionName, uid), userObj);
      localStorage.setItem('uid', uid);
      return { uid, ...userObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('uid');
      localStorage.removeItem('userData');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign up cases
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
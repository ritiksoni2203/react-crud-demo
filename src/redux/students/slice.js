import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/index";

const initialStates = {
    data: [],
    reload: [],
    status: null,
    profile: []
};

// ** studentsList
export const studentsList = createAsyncThunk(
    "studentsList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/students`);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

// ** studentsList
export const getStudent = createAsyncThunk(
    "getStudent",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/students/${id}`);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const addStudent = createAsyncThunk(
    "addStudent",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(`/students`, data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateStudent = createAsyncThunk(
    "updateStudent",
    async ({ data, id }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(`/students/${id}`, data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);


export const deleteStudent = createAsyncThunk(
    "deleteStudent",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(`/students/${id}`);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

// ** Create Slice
const studentsSlice = createSlice({
    name: "student",
    initialState: initialStates,
    extraReducers: {
        [studentsList.pending]: (state) => {
            state.loading = true;
        },
        [studentsList.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [studentsList.rejected]: (state) => {
            state.loading = false;
        },
        [getStudent.pending]: (state) => {
            state.loading = true;
        },
        [getStudent.fulfilled]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        },
        [getStudent.rejected]: (state) => {
            state.loading = false;
        },
        [addStudent.pending]: (state) => {
            state.loading = true;
        },
        [addStudent.fulfilled]: (state, action) => {
            state.loading = false;
            state.reload = action.payload;
        },
        [addStudent.rejected]: (state) => {
            state.loading = false;
        },
        [updateStudent.pending]: (state) => {
            state.loading = true;
        },
        [updateStudent.fulfilled]: (state, action) => {
            state.loading = false;
            state.reload = action.payload;
        },
        [updateStudent.rejected]: (state) => {
            state.loading = false;
        },
        [deleteStudent.pending]: (state) => {
            state.loading = true;
        },
        [deleteStudent.fulfilled]: (state, action) => {
            state.loading = false;
            state.reload = action.payload;
        },
        [deleteStudent.rejected]: (state) => {
            state.loading = false;
        }
    },
    reducers: {
        clearStudentProfile(state) {
            state.profile = []
        },
    }
});
export const { clearStudentProfile } = studentsSlice.actions

const { reducer } = studentsSlice;

export default reducer;
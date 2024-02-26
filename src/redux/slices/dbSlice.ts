// Предполагаем, что у вас есть API-функция для запроса списка таблиц
import { createAsyncThunk } from '@reduxjs/toolkit';
// В вашем dbSlice вы добавите extraReducers для обработки состояний этого thunk
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";


export const fetchTableNames = createAsyncThunk(
    'db/fetchTableNames',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://localhost:5000/api/tables');
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const dbSlice = createSlice({
    name: 'db',
    initialState: {
        tables: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Ваши обычные редьюсеры
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTableNames.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTableNames.fulfilled, (state, action) => {
                state.loading = false;
                state.tables = action.payload; // Загруженные имена таблиц
            })
            .addCase(fetchTableNames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Ошибка, если запрос не удался
            });
    },
});

export const getTablesNames = (state) => state.db.tables
export default dbSlice.reducer;
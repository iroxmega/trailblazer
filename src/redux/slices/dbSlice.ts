import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store.ts";
import {act} from "react-dom/test-utils";

export interface ITableData {
    title: string,
    recordsCount: number,
    records: []

}

export const fetchTableNames = createAsyncThunk('db/fetchTableNames',
    async (_, {rejectWithValue}): (Promise<ITableData[] | RejectWithValue<unknown, unknown>>) => {
        try {
            const response = await axios.get('http://localhost:5000/api/tables');
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(error.response.data);
        }
    })

export const fetchTableRecords = createAsyncThunk('db/fetchTableRecords',
    async (tableName: string, thunkAPI) => {
        try {

            const response = await axios.get('http://localhost:5000/api/tables/' + tableName);
            console.log(response.data.recordset)
            const state = thunkAPI.getState() as RootState;
            const tableIndex = state.db.tables.findIndex((element: ITableData) =>
                element.title === tableName);
            const result = {title: tableName, data: response.data.recordset, id: tableIndex}
            return result
        } catch (error: unknown) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
)

export interface IDb {
    tables: ITableData[],
    loading: boolean,
    error: unknown,
    currentTable: string,
    currentTableColumns: string[],
}

const initialState: IDb = {
    tables: [],
    loading: false,
    error: null,
    currentTable: '',
    currentTableColumns: [],
}

const dbSlice = createSlice({
    name: 'db',
    initialState,
    reducers: {
        closeTable: (state) => {
            state.currentTable = ''
            state.currentTableColumns = []
        }
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
                console.log(action.payload)
                state.error = action.payload; // Ошибка, если запрос не удался
            })
            .addCase(fetchTableRecords.pending, (state) => {
                state.loading = true;
                console.log('records pending')
            })
            .addCase(fetchTableRecords.fulfilled, (state, action) => {
                state.loading = false;
                state.tables[action.payload.id].records = action.payload.data
                console.log('records fulfilled')
                state.currentTable = action.payload.title
                state.currentTableColumns = Object.keys(action.payload.data[0])
            })
            .addCase(fetchTableRecords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Ошибка, если запрос не удался
            })

    },
});

export const getTablesNames = (state: RootState) => state.db.tables
export const getTableColumns = (state: RootState) => state.db.currentTableColumns

export const getTableRecords = (tableName: string) => (state: RootState) => {
    return state.db.tables.find(el => el.title === tableName)?.records
}

export const getCurrentTableName = (state: RootState) => state.db.currentTable

export const {closeTable} = dbSlice.actions
export default dbSlice.reducer;
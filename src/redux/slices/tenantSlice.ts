import {createSlice} from "@reduxjs/toolkit";

export type TenantSlice = {}

const initialState: TenantSlice = {}

export const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {},
})

export const {} = tenantSlice.actions;

export default tenantSlice.reducer;

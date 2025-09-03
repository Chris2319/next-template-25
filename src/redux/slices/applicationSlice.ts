import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export type ApplicationSlice = {}

const initialState: ApplicationSlice = {}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
})

export const {} = applicationSlice.actions;

export default applicationSlice.reducer;
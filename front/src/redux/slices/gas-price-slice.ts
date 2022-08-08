import { createSlice } from '@reduxjs/toolkit';

interface gasPriceState {
	value: null | string;
}

const initialState: gasPriceState = {
	value: null,
};

export const gasPriceSlice = createSlice({
	name: 'gasPrice',
	initialState,
	reducers: {
		update: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { update } = gasPriceSlice.actions;
export default gasPriceSlice.reducer;

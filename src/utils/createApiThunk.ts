import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../network/Network";

interface ApiThunkOptions {
	// Thunk action type, like 'user/fetch'
	type: string;

	// Function to build the endpoint
	buildPath: (arg: string) => string;

	// (Optional) Transforms API data before return
	transformResponse?: (data: any) => any;
}

export const createApiThunk = ({type, buildPath, transformResponse}: ApiThunkOptions) => {
	return createAsyncThunk(
		type,
		async (username: string, thunkAPI) => {
			try {
				const response = await getRequest(buildPath(username));

				if (response.status !== 200) {
					return thunkAPI.rejectWithValue({
						message: response.message || 'Error',
						status: response.status
					});
				}

				return transformResponse ? transformResponse(response.data) : response.data;
			} catch (error: any) {
				return thunkAPI.rejectWithValue({
					message: error.message,
					code: error.code,
					status: error.response?.status,
					data: error.response?.data
				});
			}
		},
	);
}

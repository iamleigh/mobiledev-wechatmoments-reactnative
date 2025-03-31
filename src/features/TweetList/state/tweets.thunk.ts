import {createAsyncThunk} from '@reduxjs/toolkit';

import {getRequest} from '../../../network/Network';
import {ITweet} from '../../../types';

export const fetchUserTweets = createAsyncThunk(
  'userTweets',
  async (username: string, thunkAPI) => {
    try {
      const response = await getRequest(`user/${username}/tweets`);
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue({
			message: response.message || 'Error',
			status: response.status
		});
      }
      return response.data as Array<ITweet>;
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

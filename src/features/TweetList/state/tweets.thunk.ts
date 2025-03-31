import {ITweet} from '../../../types';
import { createApiThunk } from '../../../utils/createApiThunk';

export const fetchUserTweets = createApiThunk({
	type: 'userTweets',
	path: 'tweets.json',
	transformResponse: (data: any) => data as Array<ITweet>
});

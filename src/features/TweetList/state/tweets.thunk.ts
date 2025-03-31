import {ITweet} from '../../../types';
import { createApiThunk } from '../../../utils/createApiThunk';

export const fetchUserTweets = createApiThunk({
	type: 'userTweets',
	buildPath: (username: string) => `user/${username}/tweets`,
	transformResponse: (data: any) => data as Array<ITweet>
});

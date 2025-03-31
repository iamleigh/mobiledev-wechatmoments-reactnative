import {IUser} from '../../../types';
import { createApiThunk } from '../../../utils/createApiThunk';

export const fetchUser = createApiThunk({
	type: 'user',
	buildPath: (username: string) => `user/${username}`,
	transformResponse: (data: any) => data as IUser
});

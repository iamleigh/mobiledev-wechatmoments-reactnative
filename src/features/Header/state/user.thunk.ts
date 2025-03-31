import {IUser} from '../../../types';
import { createApiThunk } from '../../../utils/createApiThunk';

export const fetchUser = createApiThunk({
	type: 'user',
	path: 'user.json',
	transformResponse: (data: any) => data as IUser
});

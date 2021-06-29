import { combineReducers } from 'redux';

import { bioReducers } from './bioReducers';

export default combineReducers({
	bio: bioReducers
});

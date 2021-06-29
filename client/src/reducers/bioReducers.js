import { FETCH_ALL, CREATE_BIO, UPDATE_BIO, DELETE_BIO } from '../constants/bioConstants';

export const bioReducers = (bios = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		case CREATE_BIO:
			return [ ...bios, action.payload ];
		case UPDATE_BIO:
			return bios.map((bioData) => (bioData._id === action.payload._id ? action.payload : bioData));
		case DELETE_BIO:
			return bios.filter((bioData) => bioData._id !== action.payload);

		default:
			return bios;
	}
};

import * as api from '../api/Axios';
import { FETCH_ALL, CREATE_BIO, UPDATE_BIO, DELETE_BIO } from '../constants/bioConstants';

export const getBio = () => async (dispatch) => {
	try {
		const { data } = await api.fetchBio();
		console.log(data)
		dispatch({
			type: FETCH_ALL,
			payload: data
		});
	} catch (error) {
		console.log(error);
	}
};

export const createBio = (newData) => async (dispatch) => {
	try {
		const { data } = await api.createBio(newData);

		dispatch({
			type: CREATE_BIO,
			payload: data
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateBio = (id, updatedPost) => async (dispatch) => {
	try {
		const { data } = await api.updateBio(id, updatedPost);

		dispatch({
			type: UPDATE_BIO,
			payload: data
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteBio = (id) => async (dispatch) => {
	try {
		await api.deleteBio(id);

		dispatch({
			type: DELETE_BIO,
			payload: id
		});
	} catch (error) {
		console.log(error.message);
	}
};

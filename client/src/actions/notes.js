import * as api from "../api";
import Note from "../components/notes/note/Note";

export const getNotes = () => async (dispatch) => {
	try {
		const { data } = await api.fetchNotes();

		dispatch({ type: "FETCH_ALL", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createNote = (note) => async (dispatch) => {
	try {
		const { data } = await api.createNote(note);
		dispatch({ type: "CREATE", payload: data });
	} catch (error) {
		console.log(error);
	}
};

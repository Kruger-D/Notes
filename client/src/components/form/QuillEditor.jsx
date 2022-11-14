import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../../actions/note-actions";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";

import { editorFormats, editorModules } from "./editorConfig";

export default function QuillEditor({ currentId, setCurrentId }) {
	const [noteData, setNoteData] = useState({
		body: {
			type: String,
			required: true
		}
	});
	const dispatch = useDispatch();
	const currentNote = useSelector(state => (currentId ? state.notes.find(p => p._id === currentId) : null));
	const countDownMs = 5000;

	useEffect(() => {
		if (currentNote) setNoteData(currentNote);
	}, [currentNote]);

	//update Timer
	let saveTimer;
	function startUpdateTimer(data) {
		saveTimer = setTimeout(() => {
			handleSubmit(data);
		}, countDownMs).then(clearTimeout(saveTimer));
	}

	//save / update data
	function handleSubmit() {
		if (currentId) {
			dispatch(updateNote(currentId, noteData));
		} else {
			dispatch(createNote(noteData));
		}
	}

	//set data
	function handleChange(data) {
		setNoteData({ ...noteData, body: data });
		console.log(noteData);
	}
	//clear current Id
	function clearId() {
		setCurrentId(null);
		setNoteData("");
	}

	return (
		<>
			<div className="form">
				<ReactQuill
					className="form"
					theme={"snow"}
					onChange={x => handleChange(x)}
					value={noteData.body}
					modules={editorModules}
					formats={editorFormats}
					placeholder="Start Typing..."
					required={true}
				/>
				<div className="form-footer">
					<button onClick={handleSubmit} className="submit-btn">
						Submit
					</button>
					<button onClick={clearId} className="submit-btn">
						Clear
					</button>
				</div>
			</div>
		</>
	);
}

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNotes } from "./actions/note-actions";
import Notes from "./components/notesList/NotesList";
import Logo from "./components/icons/dk_logo.png";
import QuillEditor from "./components/form/QuillEditor";
import "./App.css";

const App = () => {
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNotes());
	}, [dispatch]);

	return (
		<div className="main">
			<nav className="navbar">
				<img className="logo" src={Logo} alt="Daniel Kruger logo" />
				<h2 className="unselectable">Notes App</h2>
			</nav>
			<div className="view-panel">
				<Notes setCurrentId={setCurrentId} />
				<div className="edit-panel">
					<QuillEditor currentId={currentId} setCurrentId={setCurrentId} />
				</div>
			</div>
		</div>
	);
};

export default App;

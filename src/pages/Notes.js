import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { listNotes, setId, setNewNote, saveNote, updateNote } from '../redux/actions/notesActions';

const Notes = ({ dispatch, notes, _id, newNote }) => {
  React.useEffect(() => {
    dispatch(listNotes());
  }, []);

  return (
    <div>
      <h2>Notes</h2>

      <div>
        _id: <input onChange={e => dispatch(setId(e.target.value))} value={_id}></input>
        <hr/>
        New value: <input onChange={e => dispatch(setNewNote(e.target.value))} value={newNote}></input>
        <hr/>
        <button onClick={() => dispatch(saveNote())}>Save</button>
        <button onClick={() => dispatch(updateNote())}>Update</button>
      </div>
      {notes.map((note, i) => (
        <div key={i}>
          <h4>{note._id}</h4>
          <p>{note.notes}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  notes: state.notesReducer.notes,
  _id: state.notesReducer._id,
  newNote: state.notesReducer.newNote
});

export default connect(mapStateToProps)(Notes);

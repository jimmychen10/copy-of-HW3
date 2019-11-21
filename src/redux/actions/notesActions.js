import axios from 'axios';

const setNotes = notes => ({
  type: 'SET_NOTES',
  notes
})

export const listNotes = () => (dispatch, getState) => {
  axios.get('/list')
    .then((res) => dispatch(setNotes(res.data)))
    .catch(console.log);
};

export const setId = (_id) => ({
  type: 'SET_ID',
  _id
});

export const setNewNote = (newNote) => ({
  type: 'SET_NEW_NOTE',
  newNote
});

export const saveNote = () => (dispatch, getState) => {
  const {_id, newNote} = getState().notesReducer;

  // update the note, clear the textfield, update the list of notes/text on the page.
  axios.get(`/save?_id=${_id}&notes=${newNote}`)
    .then(() => {
      dispatch(setNewNote(''));
      dispatch(setId(''));
      dispatch(listNotes());
    })
    .catch(console.log);
};

export const updateNote = () => (dispatch, getState) => {
  const {_id, newNote} = getState().notesReducer
  axios.get(`/update?_id=${_id}&notes=${newNote}`)
    .then(() => {
      dispatch(setNewNote(''))
      dispatch(setId(''))
      dispatch(listNotes(''))
    })
    .catch(console.log)
};
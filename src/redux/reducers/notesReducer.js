const DEFAULT_STATE = {
  notes: [],
  _id: '',
  newNote: ''
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_ID':
      return {
        ...state,
        _id: action._id
      }
    case 'SET_NEW_NOTE':
      return {
        ...state,
        newNote: action.newNote
      }
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.notes
      };
    default:
      return state;
  }
};

export default notesReducer;

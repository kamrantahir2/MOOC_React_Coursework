const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return state.concat(action.payload);
    case "TOGGLE_IMPORTANCE":
      const id = action.payload.id;
      const noteChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteChange,
        important: !noteChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    default:
      return state;
  }
};

export default noteReducer;

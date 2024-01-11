const NoteForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteForm;

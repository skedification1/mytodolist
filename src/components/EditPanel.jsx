import React from 'react';

const EditPanel = ({ testt }) => {
  return (
    <div className="todo_tasks_item">
      <input type="text" defaultValue={testt} />
      <button onClick={() => {}}>Fix text</button>
      <button onClick={() => {}}>Delete</button>
    </div>
  );
};
export default EditPanel;

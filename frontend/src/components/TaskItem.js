import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.name}: {task.description}
      </span>
      <button onClick={onToggle}>{task.completed ? 'Undo' : 'Complete'}</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default TaskItem;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tasks', {
        name: taskName,
        description: taskDescription
      });
      setTaskName('');
      setTaskDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error.response ? error.response.data : error.message);
    }
  };

  const toggleTaskCompletion = async (index) => {
    const task = tasks[index];
    try {
      await axios.patch(`http://localhost:5000/tasks/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task completion:', error.response ? error.response.data : error.message);
    }
  };

  const deleteTask = async (index) => {
    const task = tasks[index];
    console.log('Deleting task ID:', task._id); // Debug log
    try {
      await axios.delete(`http://localhost:5000/tasks/${task._id}`);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          required
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="task-list">
        <ul>
          {tasks.map((task, index) => (
            <li key={task._id} className={task.completed ? 'completed' : ''}>
              <span>{task.name}: {task.description}</span>
              <button onClick={() => toggleTaskCompletion(index)} className="complete">
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(index)} className="delete">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';

const motivationalQuotes = [
  "Your future is created by what you do today, not tomorrow.",
  "The secret of getting ahead is getting started.",
  "Do something today that your future self will thank you for.",
  "Even a bad day only lasts 24 hours.",
  "Be so good they can't ignore you."
];

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [quote, setQuote] = useState("");
  const [userName, setUserName] = useState("");
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function startEdit(index) {
    setEditIndex(index);
    setEditText(tasks[index]);
  }

  function saveEdit() {
    if (editText.trim() !== "") {
      const updatedTasks = tasks.map((task, i) => (i === editIndex ? editText : task));
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditText("");
    }
  }

  return (
    <div className="container">
      {!userName ? (
        <div className="name-input">
          <h2>Enter your name:</h2>
          <input
            type="text"
            placeholder="Your name..."
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputName.trim() !== "") {
                setUserName(inputName.trim());
              }
            }}
          />
          <button onClick={() => {
            if (inputName.trim() !== "") setUserName(inputName.trim());
          }}>Confirm</button>
        </div>
      ) : (
        <div className="todo-app">
          <h1>{userName}'s To-Do List</h1>
          <p className="quote">"{quote}"</p>
          <div className="task-input">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span>{task}</span>
                )}
                <div className="task-actions">
                  {editIndex === index ? (
                    <button onClick={saveEdit} className="save">Save</button>
                  ) : (
                    <button onClick={() => startEdit(index)} className="edit">Edit</button>
                  )}
                  <button onClick={() => deleteTask(index)} className="delete">Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="footer">&copy; 2025 Developed by Sravanth</p>
        </div>
      )}
    </div>
  );
}

export default ToDoApp;

import React, { useState, useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTasks = () => {
    fetch("https://api.example.com/gettasks")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => console.log("Error fetching tasks", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (task === "") {
      alert("Task cannot be empty");
      return;
    }

    const newTask = {
      id: todos.length + 1,
      taskName: task,
      status: "not_done",
    };

    fetch("https://api.example.com/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, newTask]);
        setTask("");
      })
      .catch((err) => console.log("Error adding task", err));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.taskName}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;

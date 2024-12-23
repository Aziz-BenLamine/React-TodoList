import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleSubmit = () => {
    if (editId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editInput } : todo
      );
      setTodos(updatedTodos);
      setEditId(null);
      setEditInput("");
    } else {
      const newTodo = { id: Date.now(), text: input };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="New Todo"
        value={editId ? editInput : input}
        onChange={(e) =>
          editId ? setEditInput(e.target.value) : setInput(e.target.value)
        }
      />

      <button type="submit" onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>
      <ul className="todos-list">
        {todos.map(({ text, id }) => {
          return (
            <li key={id}>
              <span>{text}</span>
              <button className="edit" onClick={() => editTodo(id, text)}>
                ✏️
              </button>
              <button className="close" onClick={() => removeTodo(id)}>
                ❎
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;

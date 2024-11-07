/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase/client";

// TODO Counter
function TodoCounter({ todos }) {
  const completedTodos = todos.filter((todo) => !!todo.done).length;

  return (
    <div className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-md mb-4">
      You have completed {completedTodos} of {todos.length} TODOs
    </div>
  );
}

// TODO Search
function TodoSearch({ setSearchValue }) {
  return (
    <input
      className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search your TODO"
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}

// Header for TODO List
function TodoHeader() {
  return (
    <div className="flex justify-center py-2 border-b border-gray-300 mb-4">
      <p className="font-semibold text-gray-600">Your TODO</p>
    </div>
  );
}

// TODO List with editing and deleting functionality
function TodoList({ currentItems }) {
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  async function deleteTodo(id) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) console.log(error);
  }

  async function checkTodo({ id, done }) {
    const { data, error } = await supabase
      .from("todos")
      .update({ done: !done })
      .eq("id", id)
      .select();
    if (error) console.log(error);
  }

  async function editTodo(todo) {
    const { data, error } = await supabase
      .from("todos")
      .update({ name: editText })
      .eq("id", todo.id)
      .select();
    if (error) console.log(error);
    setEditingTodo(null); // Salir del modo de edición después de actualizar
  }

  function handleEditClick (todo) {
    setEditingTodo(todo.id);
    setEditText(todo.name);
  };

  function handleEditSubmit (todo) {
    editTodo(todo);
  };

  function handleEditKeyDown (event, todo) {
    if (event.key === "Enter") {
      editTodo(todo); // Save changes on Enter
    }
  };

  return (
    <ul className="space-y-4">
      {currentItems.map((todo) => (
        <li
          className="flex items-center justify-between bg-white shadow rounded-md p-4"
          key={todo.id}
        >
          {editingTodo === todo.id ? (
            <>
              <input
                type="text"
                className="border p-2 rounded-md flex-grow mr-2"
                value={editText}
                onChange={(event) => setEditText(event.target.value)}
                onKeyDown={(event) => handleEditKeyDown(event, todo)}
              />
              <button
                onClick={() => handleEditSubmit(todo)}
                className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTodo(null)}
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded-md ml-2 hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEditClick(todo)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-4"
              >
                Edit
              </button>
              <p className="text-gray-500">
                {todo.date.slice(0, 4)}/{todo.date.slice(5, 7)}/
                {todo.date.slice(8, 10)}
              </p>
              <p className="flex-grow text-gray-800 font-semibold">
                {todo.name}
              </p>
              <button
                onClick={() => checkTodo(todo)}
                className={`px-2 py-1 rounded ${
                  todo.done ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                Check
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

// Pagination for TODO list
function Pagination({ setCurrentPage, itemsPerPage, rows, currentPage }) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(rows / itemsPerPage); i++) {
    pages.push(i);
  }

  if (pages.length > 1) {
    return (
      <div className="flex space-x-2 mt-4">
        {pages.map((page) => {
          let isActive = page === currentPage;
          return (
            <button
              value={page}
              onClick={() => setCurrentPage(page)}
              key={page}
              className={`px-4 py-2 rounded ${
                isActive ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }
}

// Input for creating a new TODO
function InputTodo({ setCurrentPage, state }) {
  const [inputValue, setInputValue] = useState("");
  async function insertTodo() {
    if (inputValue.trim() === "") return; // To avoid empty TODOS
    try {
      const { error } = await supabase
        .from("todos")
        .insert([{ name: inputValue, done: state }]);
      if (!error) {
        setInputValue(""); // Clear input
        console.log("Todo added, input cleared");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    setCurrentPage(1)
  }
  
  function handleKeyDown (event) {
    if (event.key === "Enter") {
      insertTodo(); // calls insertTodo when Enter 
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        value={inputValue}
        onKeyDown={(event)=>handleKeyDown(event)}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Write your new TODO"
        className="border border-gray-300 p-2 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <CreateTodoButton
        insertTodo={insertTodo}
      />
    </div>
  );
}

// Button to create a new TODO
function CreateTodoButton({ insertTodo }) { 
  return (
    <button
      onClick={() => insertTodo()}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Add
    </button>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main App Component
function App() {
  const [state, setState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const events = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          getTodos();
        }
      )
      .subscribe();

    async function getTodos() {
      let { data, error } = await supabase
        .from("todos")
        .select("*")
        .ilike("name", `%${searchValue}%`)
        .order("id", { ascending: false });
      setTodos(data);
    }
    getTodos();

    return () => {
      supabase.removeChannel(events);
    };
  }, [searchValue]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  const lastPostIndex = currentPage * itemsPerPage;
  const firstPostIndex = lastPostIndex - itemsPerPage;
  const currentItems = todos.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="max-w-lg w-full space-y-6">
        <InputTodo setCurrentPage={setCurrentPage} state={state} />
        <TodoCounter todos={todos} />
        <TodoSearch setSearchValue={setSearchValue} />
        <TodoHeader />
        {currentItems.length >= 1 ? (
          <TodoList currentItems={currentItems} />
        ) : (
          <p className="text-gray-500">
            Theres no TODOs, start creating a new one!
          </p>
        )}
        <Pagination
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          rows={todos.length}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
/* eslint-disable react/prop-types */
import { useState } from "react";
import { supabase } from "../supabase/client";
import { 
  deleteTodo,
  checkTodo
 } from "../Services/todo.service";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQueryClient } from "@tanstack/react-query";

// TODO List with editing and deleting functionality

export function TodoList({ currentItems }) {
  const [parent] = useAutoAnimate();
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const queryClient = useQueryClient();
  
  async function editTodo(todo) {
    const { error } = await supabase
      .from("todos")
      .update({ name: editText })
      .eq("id", todo.id)
      .select();
    if (error) console.log(error);
    setEditingTodo(null); // Salir del modo de edición después de actualizar
  }

  function handleEditClick(todo) {
    setEditingTodo(todo.id);
    setEditText(todo.name);
  }

  async function handleSubmit(event,todo) {
    event.preventDefault()
    await editTodo(todo);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
  
  async function handleCheck(todo) {
    await checkTodo(todo);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }

  return (
    <ul ref={parent} className="space-y-4">
      {currentItems.map((todo) => (
        <li
          className="flex items-center justify-between bg-white shadow rounded-md p-4"
          key={todo.id}
        >
          { editingTodo === todo.id ? (
            <>
              <form onSubmit={(event)=>handleSubmit(event,todo)}>
                <input
                  type="text"
                  className="border p-2 rounded-md flex-grow mr-2"
                  value={editText}
                  onChange={(event) => setEditText(event.target.value)}
                  // onKeyDown={(event) => handleEditKeyDown(event, todo)}
                />
                <button
                  // onClick={() => handleEditSubmit(todo)}
                  type="submit"
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
              </form>
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
                onClick={() => handleCheck(todo)}
                className={`px-2 py-1 rounded ${
                  todo.done ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                Check
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
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

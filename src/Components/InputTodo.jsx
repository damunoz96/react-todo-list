/* eslint-disable react/prop-types */
import { useState } from "react";
import { insertTodo } from "../Utils";

// Input for creating a new TODO
export function InputTodo({ setCurrentPage }) {
  
  const [inputValue, setInputValue] = useState("");

  function handleKeyDown(event, inputValue, setInputValue, setCurrentPage) {
    if (event.key === "Enter") {
      insertTodo(inputValue, setInputValue, setCurrentPage); // calls insertTodo when Enter
      setInputValue(""); // Clear input
      console.log("Todo added, input cleared");
      setCurrentPage(1);
    }
  }

  return (
      <div className="flex space-x-2">
        <input
          value={inputValue}
          onKeyDown={(event) =>
            handleKeyDown(event, inputValue, setInputValue, setCurrentPage)
          }
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Write your new TODO"
          className="border border-gray-300 p-2 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => insertTodo(inputValue, setInputValue, setCurrentPage)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
  );
}

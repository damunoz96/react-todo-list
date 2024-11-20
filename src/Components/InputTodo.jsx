/* eslint-disable react/prop-types */
import { useState } from "react";
import { supabase } from "../supabase/client";

// Input for creating a new TODO
export function InputTodo({ setCurrentPage}) {
  const [inputValue, setInputValue] = useState("");

  async function insertTodo() {
    console.log(inputValue);
    if (inputValue.trim() === "") return; // To avoid empty TODOS
    try {
      await supabase.from("todos").insert([
        {
          name: inputValue,
        },
      ]);
      console.log("Todo added, input cleared");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    setInputValue(""); // Clear input
    setCurrentPage(1);
  }

  function handleSubmit(event) {
    event.preventDefault()
    // if (event.key === "Enter") {
    //   insertTodo(); // calls insertTodo when Enter
    //   setInputValue(""); // Clear input
    //   console.log("Todo added, input cleared");
    //   setCurrentPage(1);
    // }
    insertTodo();

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2">
        <input
          value={inputValue}
          // onKeyDown={(event) =>
          //   handleKeyDown(event, inputValue, setInputValue, setCurrentPage)
          // }
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Write your new TODO"
          className="border border-gray-300 p-2 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
}

import { supabase } from "../supabase/client";

export async function insertTodo(inputValue, setInputValue, setCurrentPage) {
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

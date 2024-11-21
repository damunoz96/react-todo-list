import { getTodos, checkTodo, deleteTodo } from "../Services/todo.service";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";

export function useTodos({ page, query }) {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const { userId } = useUser();

  const getTodoList = async (userId, page, query) => {
    const { data, count } = await getTodos(userId, page, query);
    setTodos(data);
    setCount(count);
  }

  useEffect(() => {
    if (!userId) return;
    getTodoList(userId, page, query);
  }, [userId, page, query]);

  return { todos, count, checkTodo, deleteTodo };
}
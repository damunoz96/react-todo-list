import { getTodos, checkTodo, deleteTodo, insertTodo } from "../Services/todo.service";
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

  const refresh = async () => {
    if (!userId || !page) return;
    getTodoList(userId, page, query);
  }

  useEffect(() => {
    if (!userId || !page) return;
    getTodoList(userId, page, query);
  }, [userId, page, query]);

  

  return { todos, count, checkTodo, deleteTodo, insertTodo, refresh };
}
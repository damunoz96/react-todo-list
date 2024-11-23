import { getTodos, checkTodo, deleteTodo, insertTodo } from "../Services/todo.service";
import { useUser } from "./useUser";
import { useQuery } from "@tanstack/react-query";

export function useTodos({ page, query }) {
  const { userId } = useUser();
  const q = useQuery({
    queryKey: ['todos', userId, page, query],
    queryFn: async ({ queryKey }) => {
      const { 1: userId, 2: page, 3: query } = queryKey;
      const { data, count } = await getTodos(userId, page, query);
      return { list: data, count: count };
    },
    enabled: Boolean(userId),
  });

  const refresh = async () => {
    q.refetch();
  }

  return { 
    todos: q.data?.list ?? [], 
    count: q.data?.count ?? 0, 
    checkTodo, 
    deleteTodo, 
    insertTodo, 
    refresh 
  };
}
import { getTodos, checkTodo, deleteTodo, insertTodo } from "../Services/todo.service";
import { useQuery } from "@tanstack/react-query";

export function useTodos({ page, query }) {
  const q = useQuery({
    queryKey: ['todos', 'all', page, query],
    queryFn: async ({ queryKey }) => {
      const { 2: page, 3: query } = queryKey;
      const { data, count } = await getTodos(page, query);
      return { list: data, count: count };
    },
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
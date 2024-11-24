/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTodos } from "../../hooks/useTodos";
import { useUser } from "../../hooks/useUser";
import {
  TodoSearch,
  TodoHeader,
  TodoList,
  Pagination,
  InputTodo,
} from "../../Components";
import { ProgressBar } from "../../Components/ProgressBar";
import { useQueryClient } from "@tanstack/react-query";

// Main App Component
function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [query] = useDebounce(searchValue, 500);
  const [page, setPage] = useState(1);
  const { todos, count, isFetching } = useTodos({ page, query: query });
  const { logout } = useUser();
  const queryClient = useQueryClient();

  const ITEMS_PER_PAGE = 4;

  const handleChangeTodos = async () => {
    setPage(1);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }

  useEffect(() => {
    if (isFetching) return;
    if (todos.length === 0) setPage((p) => p - 1);
  }, [todos, isFetching]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="max-w-lg w-full space-y-6">
        <InputTodo onTodoAdd={handleChangeTodos} />
        <TodoSearch searchTodo={(value) => setSearchValue(value)} />
        <TodoHeader />
        <ProgressBar />
        <TodoList currentItems={todos} />
        <Pagination
          setCurrentPage={setPage}
          itemsPerPage={ITEMS_PER_PAGE}
          rows={count}
          currentPage={page}
        />
      </div>
      <button onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default HomePage;

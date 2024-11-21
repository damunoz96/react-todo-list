/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useTodos } from "../../hooks/useTodos";
import { useUser } from "../../hooks/useUser";
import {
  TodoCounter,
  TodoSearch,
  TodoHeader,
  TodoList,
  Pagination,
  InputTodo,
} from "../../Components";

// Main App Component
function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [query] = useDebounce(searchValue, 1_000);
  const [page, setPage] = useState(1);
  const { todos, count } = useTodos({ page, query });
  const { logout } = useUser();

  const ITEMS_PER_PAGE = 4;

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="max-w-lg w-full space-y-6">
        <InputTodo setCurrentPage={setPage}/>
        <TodoCounter todos={todos} />
        <TodoSearch searchTodo={(value) => setSearchValue(value)} />
        <TodoHeader />

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

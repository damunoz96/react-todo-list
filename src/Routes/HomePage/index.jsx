/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { useDebouncedCallback } from "use-debounce";
import {
  TodoCounter,
  TodoSearch,
  TodoHeader,
  TodoList,
  Pagination,
  InputTodo,
} from "../../Components";
import { useNavigate } from "react-router-dom";

// Main App Component
function HomePage() {
  const [userId, setUserId] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  const changes = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "todos" },
      (payload) => {
        getTodos("");
      }
    )
    .subscribe();

  async function getTodos(value) {
    const { data } = await supabase
        .from("todos")
        .select("*")
        // .ilike("UUID", `%${userId}`)
        .ilike("name", `%${value}%`)
        .order("id", { ascending: false });
      setTodos(data);    
  }
  const searchTodo = useDebouncedCallback(getTodos, 1000);

  useEffect(() => {
    getTodos("")
  }, []);
  
  console.log(todos)

  useEffect(() => {
    async function getUserId() {
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setUserId(data.user.id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserId();
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") navigate("/login");
      // if (!session) navigate("/login")
    });
  }, [navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTodo]);

  const handleLogOut = () => {
    supabase.auth.signOut();
    supabase.removeAllChannels();
  };

  const lastPostIndex = currentPage * itemsPerPage;
  const firstPostIndex = lastPostIndex - itemsPerPage;
  const currentItems = todos.slice(firstPostIndex, lastPostIndex);
  console.log(userId);
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="max-w-lg w-full space-y-6">
        <InputTodo setCurrentPage={setCurrentPage}/>
        <TodoCounter todos={todos} />
        <TodoSearch 
          searchTodo={searchTodo} />
        <TodoHeader />
        {currentItems.length >= 1 ? (
          <TodoList currentItems={currentItems} />
        ) : (
          <p className="text-gray-500">
            Theres no TODOs, start creating a new one!
          </p>
        )}
        <Pagination
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          rows={todos.length}
          currentPage={currentPage}
        />
      </div>
      <button className="" onClick={() => handleLogOut()}>
        Log out
      </button>
    </div>
  );
}

export default HomePage;

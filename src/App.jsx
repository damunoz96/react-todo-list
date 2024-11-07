/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './supabase/client'

//TODO LIST
function TodoCounter( { todos } ) {
  const completedTodos = todos.filter((todo)=> !!todo.done).length
  
  return (
    <div>Have completed {completedTodos} of {todos.length} TODOs</div>
  )
}

function TodoSearch({ setSearchValue }){
  return (
    <input 
    className='border border-black' 
    placeholder='search your TODO'
    onChange={(e)=>setSearchValue(e.target.value)}
    />
  )
}

function TodoHeader() {
  return (
    <div className={"flex"}>
      <span>Date (YY/MM/DD)</span>
      <p>Your TODO</p>
    </div>
  );
}

function TodoList( {currentItems} ) { 

  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  async function deleteTodo( id ){
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

  }
  async function checkTodo( {id , done} ){
    const { data, error } = await supabase
      .from("todos")
      .update({ done: !done })
      .eq('id', id)
      .select();
  }
  async function editTodo(todo) {
    const { data, error } = await supabase
      .from("todos")
      .update({ name: editText })
      .eq("id", todo.id)
      .select();
    if (error) console.log(error);
    setEditingTodo(null); // Salir del modo de edición después de actualizar
  }

  const handleEditClick = (todo) => {
    setEditingTodo(todo.id); // Save id of todo
    setEditText(todo.name); // Colocamos el nombre actual en el campo de edición
  };

  const handleEditSubmit = (todo) => {
    editTodo(todo); // call edit func
  };
  

  return(
    <>
      <ul>
        {
          currentItems.map(todo=>{
            return (
              <li className={"flex"} key={todo.id}>
                {editingTodo === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => handleEditSubmit(todo)}>Save</button>
                    <button onClick={() => setEditingTodo(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(todo)}>Edit</button>
                    <p>
                      {todo.date.slice(0, 4)}/{todo.date.slice(5, 7)}/
                      {todo.date.slice(8, 10)}
                    </p>
                    <p>{todo.name}</p>
                    <button onClick={() => checkTodo(todo)}>Check</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </>
                )}
              </li>
            );
          }
          )
        }
      </ul>
    </>
  )
}

//Pagination

function Pagination({ setCurrentPage, itemsPerPage, rows }) {
  let pages = [];
  for(let i = 1; i<=Math.ceil(rows/itemsPerPage);i++) {
    pages.push(i);
  }

    if (pages.length>1){
    return(
      <div>
        {
          pages.map(page=>{
            return(
              <button
              value={page}
              onClick={()=>setCurrentPage(page)}
              key={page}>{page}</button>
            )
          })
        }
      </div>
      
    )
  }
}

//Create New TODO

function InputTodo ({state}) {
  let [inputValue,setInputValue] = useState("")
  console.log(inputValue);
  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Write your new TODO"
      />
      <CreateTodoButton
        inputValue={inputValue}
        state={state}
        setInputValue={setInputValue}
      />
    </>
  );
}

function CreateTodoButton({ inputValue, state, setInputValue}) {
  

  async function insertTodo() {
    
    try {
      const { error } = await supabase
        .from("todos")
        .insert([{ name: inputValue, done: state }]);

      if (!error) {
        setInputValue(""); // This should clear the input
        console.log("Todo added, input cleared");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return <button onClick={() => insertTodo()}>Add</button>;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function App() {


  const [state, setState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [todos, setTodos] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const events = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          // When a change happens, fetch the updated list of todos
          getTodos();
        }
      )
      .subscribe();

    async function getTodos() {
        let { data, error } = await supabase
        .from("todos")
        .select('*')
        .ilike('name',`%${searchValue}%`);
        setTodos(data);
      

    }
    getTodos();

    return () => {
      supabase.removeChannel(events);
    };
  }, [searchValue]);

  const lastPostIndex = currentPage * itemsPerPage;
  const firstPostIndex = lastPostIndex - itemsPerPage;
  const currentItems = todos.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-row gap-96">
      <div>
        <InputTodo state={state} setState={setState} />
      </div>
      <div className="flex flex-col">
        <TodoCounter todos={todos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <TodoHeader />
        {currentItems.length >= 1 ? (
          <TodoList currentItems={currentItems} />
        ) : (
          <p>Theres no TODOS, start creating a new one!</p>
        )}
        <Pagination
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          rows={todos.length}
        />
      </div>
    </div>
  );
}

export default App

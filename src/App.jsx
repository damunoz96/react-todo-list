/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './supabase/client'

//TODO LIST
function TodoCounter({ completed,total }) {
  return (
    <div>Have completed {completed} of {total} TODOs</div>
  )
}

function TodoSearch(){
  return (
    <input className='border border-black' placeholder='search your TODO'/>
  )
}

function TodoList() { 
  const events = supabase
    .channel("custom-all-channel")
    .on("postgres_changes", { event: "*", schema: "public", table: "todos" })
    .subscribe();

  useEffect(() => {
    async function getTodos() {
      let { data, error } = await supabase.from("todos").select("*");
      setTodos(data);
    }
    getTodos();
  }, [events]);

  
  const [todos, setTodos] = useState([]);
      
  return(
    <>
      <ul>
        {
          todos.map(todo=>{
            return(
              <li className={"flex"} key={todo.id}>
                <span>Edit</span>
                <p>{todo.date}</p>
                <p>{todo.name}</p>
                <span>Check</span>
                <span>Delete</span>
              </li>
            )
          })
        }
      </ul>
    </>
  )
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

      if (error) {
        console.error("Error inserting todo:", error);
      } else {
        setInputValue(""); // This should clear the input
        console.log("Todo added, input cleared");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return <button onClick={() => insertTodo()}>Add</button>;
}


function App() {
  const [state, setState] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  
  return (
    <div className='flex flex-row gap-96'>    
      <div>
        <InputTodo state={state} setState={setState}/>
      </div>
      <div className='flex flex-col'>
        <TodoCounter completed={0} total={3}/>
        <TodoSearch/>
        <TodoList />
      </div>
    </div>
  );
}

export default App

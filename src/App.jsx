import { useState } from 'react'
import './App.css'
import { supabase } from './supabase/client'
import { createContext } from 'react'

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

// function TodoList() {
//   async function todos() {
//     const { data, error } = await supabase
//     .from('todos')
//     .select('name','done')
//   }
  

// }

function InputTodo ({state}) {
  let [inputValue,setInputValue] = useState("")
  return (
    <>
      <input
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
  console.log(inputValue);

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
  let [state, setState] = useState(false);
  
  return (
    <div className='flex flex-row gap-96'>    
      <div>
        <InputTodo state={state} setState={setState}/>
      </div>
      <div>
        <TodoCounter completed={0} total={3}/>
        <TodoSearch/>
        {/* <TodoList/> */}
      </div>
    </div>
  );
}

export default App

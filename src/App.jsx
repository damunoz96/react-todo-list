import './App.css'

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

function InputTodo () {
  return (
    <input placeholder='Create a new TODO'/>
  )
}

function CreateTodoButton () {
  return (
    <button>Add</button>
  )
}

function App() {
  
  return (
    <div className='flex flex-row gap-96'>    
      <div>
        <InputTodo/>
        <CreateTodoButton/>
      </div>
      <div>
        <TodoCounter completed={0} total={3}/>
        <TodoSearch/>
      </div>
    </div>
  );
}

export default App

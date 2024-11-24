/* eslint-disable react/prop-types */
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { TbTrash, TbPencil, TbCheck } from "react-icons/tb";
import { deleteTodo, checkTodo } from "../Services/todo.service";
import { EditModal } from "./EditModal";

export function TodoItem({ todo }) {
  const [editOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();

  async function handleDelete(id) {
    await deleteTodo(id);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
  
  async function handleCheck(todo) {
    await checkTodo(todo);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
  
  const date = useMemo(() => {
    const formater = new Intl.DateTimeFormat('es-CO');
    const d = new Date(todo.date)
    return formater.format(d);
  }, [todo.date]);

  return (
    <>
      <li key={todo.id}>
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white flex items-center gap-4">
          <div>
            {
              todo.done ? (
                <button onClick={() => handleCheck(todo)} className="w-6 h-6 rounded-full border border-green-400 bg-green-500 text-green-50 flex items-center justify-center">
                  <TbCheck size={18} />
                </button>
              ) : (
                <button onClick={() => handleCheck(todo)} className="w-6 h-6 rounded-full border border-gray-400"></button>
              )
            }
          </div>
          <div className="flex-1">
            <p className={`text-gray-800 font-medium ${todo.done ? 'line-through' : ''}`}>{todo.name}</p>
            <p className="text-gray-500">{date}</p>
          </div>
          <div className="flex gap-2">
            {
              !todo.done && (
                <button onClick={() => setEditOpen(true)} className="w-9 h-9 flex justify-center items-center rounded-md text-gray-400 hover:bg-blue-100 hover:text-blue-700">
                  <TbPencil size={22} />
                </button>
              )
            }
            <button onClick={() => handleDelete(todo.id)} className="w-9 h-9 flex justify-center items-center rounded-md text-gray-400 hover:bg-red-100 hover:text-red-700">
              <TbTrash size={22} />
            </button>
          </div>
        </div>
      </li>
      <EditModal 
        todo={todo}
        isOpen={editOpen} 
        onClose={() => setEditOpen(false)} 
      />
    </>
  )
}
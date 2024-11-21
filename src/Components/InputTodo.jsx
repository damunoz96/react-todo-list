/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Input } from "./Input";
import { useTodos } from "../hooks/useTodos";

// Input for creating a new TODO
export function InputTodo({ onTodoAdd }) {
  const { insertTodo } = useTodos({ page: 1 });
  const { 
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      todo: '',
    },
    onSubmit: async (data, actions) => {
      await insertTodo(data.todo);
      actions.resetForm();
      onTodoAdd?.();
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2">
        <Input 
          value={values.todo}
          onChange={handleChange}
          onBlur={handleBlur}
          name="todo"
          placeholder="Write your new TODO"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
}

/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Input } from "./Input";
import { useTodos } from "../hooks/useTodos";
import { TbPlus } from 'react-icons/tb';
import { object, string } from "yup";

const validationSchema = object({
  todo: string().required(),
});

// Input for creating a new TODO
export function InputTodo({ onTodoAdd }) {
  const { insertTodo } = useTodos({ page: 1, query: '' });
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
    },
    validationSchema
  });

  return (
    <form className="w-full flex gap-2" onSubmit={handleSubmit}>
      <div className="flex-1">
        <Input
          value={values.todo}
          onChange={handleChange}
          onBlur={handleBlur}
          name="todo"
          placeholder="Write your new TODO"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white h-[42px] w-[42px] flex justify-center items-center rounded-md hover:bg-blue-600">
        <TbPlus size={22} strokeWidth={3} />
      </button>
    </form>
  );
}

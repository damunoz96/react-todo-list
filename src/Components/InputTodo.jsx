/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Input } from "./Input";
import { useTodos } from "../hooks/useTodos";
import { TbPlus } from 'react-icons/tb';
import { date, object, string } from "yup";
import  Flatpickr  from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const validationSchema = object({
  todo: string().required(),
  completion: date().required(),
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
      completion: '',
    },
    onSubmit: async (data, actions) => {
      await insertTodo(data.todo, data.completion);
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
      <Flatpickr
        value={values.completion}
        onChange={(date) => {
          handleChange({ target: { name: "completion", value: date } });
        }}
        options={{
          dateFormat: "d/m/Y",
          minDate: new Date(),
        }}
        placeholder="Select a checkday"
        className="bg-white border border-gray-300 rounded-md p-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white h-[42px] w-[42px] flex justify-center items-center rounded-md hover:bg-blue-600"
      >
        <TbPlus size={22} strokeWidth={3} />
      </button>
    </form>
  );
}

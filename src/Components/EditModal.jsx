/* eslint-disable react/prop-types */
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useFormik } from "formik";
import { supabase } from "../supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function EditModal({ isOpen, onClose, todo }) {
  const queryClient = useQueryClient();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: todo.name
    },
    onSubmit: async (data) => {
      await supabase
        .from("todos")
        .update(data)
        .eq("id", todo.id)
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.info('Todo edited!');
      onClose?.();
    }
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel transition className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
          <DialogTitle className="font-bold mb-2">Edit Todo</DialogTitle>
          <form onSubmit={handleSubmit}>
            <Input 
              name="name"
              value={values.name}
              onChange={handleChange} 
              onBlur={handleBlur} 
            />
            <div className="flex gap-4 pt-6">
              <Button type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
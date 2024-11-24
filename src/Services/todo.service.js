import { toast } from "sonner";
import { supabase } from "../supabase/client";

const ITEMS_PER_PAGE = 4;

export async function getTodos(page = 1, query = '') {
  page=Math.max(page,1);
  const init =(page - 1) * ITEMS_PER_PAGE;
  const end = (init + ITEMS_PER_PAGE) - 1;
  console.log({init, end})
  const { data, count, error } = await supabase
    .from("todos")
    .select("*", { count: 'exact' })
    .ilike("name", `%${query}%`)
    .order("date", { ascending: false })
    .range(init, end);
  if (error) {throw error};
  return { data, count  };
}

export async function checkTodo({ id, done }) {
  const { error } = await supabase
    .from("todos")
    .update({ done: !done })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteTodo(id) {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
  toast.success('TODO succesfully deleted');
}

export async function insertTodo(name) {
  const { error } = await supabase.from("todos").insert([{ name }]);
  toast.success("TODO added");
  if (error) toast.error('An error ocurred interting your TODO');
}
import { supabase } from "../supabase/client";

const ITEMS_PER_PAGE = 4;

export async function getTodos(userId, page = 1, query = '') {
  const init = (page - 1) * ITEMS_PER_PAGE;
  const end = (init + ITEMS_PER_PAGE) - 1;
  const { data, count, error } = await supabase
    .from("todos")
    .select("*", { count: 'exact' })
    .eq("UUID", userId)
    .ilike("name", `%${query}%`)
    .order("date", { ascending: false })
    .range(init, end);
  if (error) throw error;
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
}

export async function insertTodo(name) {
  const { error } = await supabase.from("todos").insert([{ name }]);
  if (error) throw error;
}
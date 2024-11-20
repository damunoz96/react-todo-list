import { supabase } from "../supabase/client";

export async function deleteTodo(id) {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) console.log(error);
}

/* eslint-disable no-unused-vars */
import { supabase } from "../supabase/client";

export async function checkTodo({ id, done }) {
  const { data, error } = await supabase
    .from("todos")
    .update({ done: !done })
    .eq("id", id)
    .select();
  if (error) console.log(error);
}

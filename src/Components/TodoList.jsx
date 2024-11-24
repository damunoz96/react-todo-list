/* eslint-disable react/prop-types */
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TodoItem } from "./TodoItem";

export function TodoList({ currentItems }) {
  const [parent] = useAutoAnimate();

  return (
    <ul ref={parent} className="space-y-4">
      {currentItems.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
}

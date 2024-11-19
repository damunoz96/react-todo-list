/* eslint-disable react/prop-types */
// TODO Counter
export function TodoCounter({ todos }) {
  const completedTodos = todos.filter((todo) => !!todo.done).length;

  return (
    <div className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-md mb-4">
      You have completed {completedTodos} of {todos.length} TODOs
    </div>
  );
}

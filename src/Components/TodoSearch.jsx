/* eslint-disable react/prop-types */
// TODO Search
export function TodoSearch({ searchTodo }) {
  return (
    <input
      className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search your TODO"
      onChange={(e) => searchTodo(e.target.value)}
    />
  );
}

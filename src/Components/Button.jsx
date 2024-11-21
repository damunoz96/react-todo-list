export function Button({ children, ...props }) {
  return (
    <button className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 transition disabled:bg-gray-300" {...props}>
      {children}
    </button>
  );
}
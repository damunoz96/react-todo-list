export function Input({ error, ...props }) {
  return (
    <div className="block">
      <input
        className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        {...props}
      />
      {
        error ? (
          <span className="text-xs font-medium text-red-600 pt-1">{error}</span>
        ) : null
      }
    </div>
  )
}
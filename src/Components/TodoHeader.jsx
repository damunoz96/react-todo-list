/* eslint-disable react/prop-types */
// Header for TODO List
export function TodoHeader({ displayname }) {
  return (
      <p className="text-xl text-blue-500 font-semibold">Hi {displayname}! Here are your TODOs</p>
  );
}

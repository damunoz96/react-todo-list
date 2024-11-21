import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password1===password2) {
        try {
          const response = await supabase.auth.signUp({
            email: email,
            password: password1,
          });;
          console.log(response)
        } catch (error) {
          console.log("sucedio algo inesperado:", error);
        }
    } else {
        alert("Passwords do not match!")
    }
  };

  useEffect(() => {
    async function getUserId() {
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          navigate("/");
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.log(error);
        navigate("login");
      }
    }
    getUserId();

    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_UP") navigate("/");
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col space-y-4"
        >
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            type="email"
            required
            name="email"
            placeholder="youremail@site.com"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            type="password"
            required
            name="password1"
            placeholder="Password"
            onChange={(event) => setPassword1(event.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            type="password"
            required
            name="password2"
            placeholder="Confirm the password"
            onChange={(event) => setPassword2(event.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-green-500 font-medium hover:underline cursor-pointer"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

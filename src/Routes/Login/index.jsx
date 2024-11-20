import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await supabase.auth.signInWithOtp({
        email: email,
      });
      console.log(response);
    } catch (error) {
      console.log("sucedio algo inesperado:", error);
    }
  };

  useEffect(() => {
    async function getUserId() {
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        navigate("login");
      }
    }
    getUserId();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") navigate("/");
    });
  }, [navigate]);

  return (
    <>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-1 min-h-full flex-col w-1/3 justify-center"
      >
        <input
          className="border-black border rounded-lg"
          type="email"
          required
          name="email"
          placeholder="youremail@site.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        {/* <input
          className="border-black border rounded-lg"
          type="password"
          name="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        /> */}

        <button type="submit">Log in</button>
      </form>
      <label>
        Do not have an account?
        <a
          onClick={()=>navigate("/signup")}
          className="cursor-pointer text-blue-500"
        >
          Sign up
        </a>
      </label>
    </>
  );
}

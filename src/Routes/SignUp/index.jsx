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
        console.log("contraseñas no coinciden")
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

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_UP") navigate("/");
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
        <input
          className="border-black border rounded-lg"
          type="password"
          required
          name="password"
          placeholder="password"
          onChange={(event) => setPassword1(event.target.value)}
        />
        <input
          className="border-black border rounded-lg"
          type="password"
          required
          name="password"
          placeholder="repeat the password"
          onChange={(event) => setPassword2(event.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
      <label>
        Already have an account?
        <a
          onClick={()=>navigate("/login")}
          className="cursor-pointer text-blue-500"
        >
          Log in
        </a>
      </label>
    </>
  );
}

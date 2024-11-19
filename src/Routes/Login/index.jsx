import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";


export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await supabase.auth.signInWithOtp({
                email: email,
            })
            console.log(response)            
        } catch (error) {
            console.log("sucedio algo inesperado:", error)
        }
    }

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
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          className="border-black border rounded-lg"
          type="email"
          name="email"
          placeholder="youremail@site.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button>Send</button>
      </form>
    );
    }

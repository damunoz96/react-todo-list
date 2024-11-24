import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useFormik } from "formik";
import { object, string } from 'yup';
import { Input, Button } from "../../Components";
import { toast } from "sonner";

const validationSchema = object({
  email: string().email().required(),
  password: string().min(6).required(),
});

export function Login() {
  const navigate = useNavigate();

  const { signin } = useUser();
  const { 
    values, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isValid,
    errors,
    touched
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (data, actions) => {
      try {
        await signin(data.email, data.password);
        navigate('/');
      } catch {
        actions.resetForm();        
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input 
            type="email" placeholder="youremail@site.com" name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
          />
          <Button disabled={!isValid} type="submit">
            Log In
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-center text-gray-600 mt-4">
          Did you forgot your password?{" "}
          <Link to="/forgotpassword" className="text-blue-500 font-medium hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

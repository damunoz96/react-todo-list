import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useUser } from "../../hooks/useUser";
import { Button, Input } from "../../Components";
import { string, object, ref } from "yup";

const validationSchema = object({
  displayname: string().required().min(6),
  email: string().email().required(),
  password: string().min(6).required(),
  confirmPassword: string().oneOf([ref('password')], 'Passwords must be the same').required(),
});


export function SignUp() {
  const { singup } = useUser();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      displayname:'',
      email:'',
      password:'',
      confirmPassword:'',
    },
    validationSchema,
    onSubmit: async(data, actions)=>{
      try {
        await singup(data.email, data.confirmPassword, data.displayname)
      } catch {
        actions.resetForm()
      }
    }
  });
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            value={values.displayname}
            type="input"
            name="displayname"
            placeholder="Display name"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.displayname && errors.displayname}
          />
          <Input
            value={values.email}
            type="email"
            name="email"
            placeholder="youremail@site.com"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
          <Input
            value={values.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
          />
          <Input
            value={values.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm the password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && errors.confirmPassword}
          />
          <Button
            disabled={!isValid}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-medium hover:underline cursor-pointer"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

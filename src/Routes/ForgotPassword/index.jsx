import { useNavigate, Link, redirect } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Input, Button } from "../../Components";
import { toast } from "sonner";

const validationSchema = object({
  email: string().email().required(),
});

export function ForgotPassword() {
  const navigate = useNavigate();

  const { passwordrecovery } = useUser();
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
      email: "",
    },
    validationSchema,
    onSubmit: async (data, actions) => {
      try {
        await passwordrecovery(data.email);
        toast.info('Check your email to recover password')
      } catch {
        actions.resetForm();
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome Back!
        </h2> */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            type="email"
            placeholder="youremail@site.com"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
          <Button disabled={!isValid} type="submit">
            Recover password
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already remember your account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useUser } from "../../hooks/useUser";
import { Button, Input } from "../../Components";
import { string, object, ref } from "yup";
import { toast } from "sonner";

const validationSchema = object({
  password: string().min(6).required(),
  confirmPassword: string().oneOf(
    [ref("password")],
    "Passwords must be the same"
  ),
});

export function ResetPassword() {
  const navigate = useNavigate();
  const { updatepassword } = useUser();
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
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (data, actions) => {
      try {
        await updatepassword(data.confirmPassword);
        toast.success('Password succesfully updated')
        navigate("/login");
      } catch {
        actions.resetForm();
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Enter the new password
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
          <Button disabled={!isValid} type="submit">
            Reset Password
          </Button>
        </form>
        
      </div>
    </div>
  );
}

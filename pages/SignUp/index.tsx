import { Button, TextInputField } from "evergreen-ui";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
export default function SignUp() {
  const router = useRouter();

  const routeHandler = () => {
    router.push("/LogIn");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, "name must be atleast 3 characters long")
        .required(),
      email: yup.string().email("enter a valid email").required(),
      password: yup
        .string()
        .min(6, "enter a password atlest 6 characters")
        .required(),
    }),
  });

  return (
    <div className="w-full bg-[#5865F2] flex justify-center  items-center h-[100vh]">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-800 w-[35rem] rounded-lg px-7 py-9 text-white"
      >
        <div className="text-white mb-5">
          <TextInputField
            className="!bg-inherit !h-12 !text-base  !text-white"
            label="User name :"
            name="name"
            marginBottom={5}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="John dee"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-600 text-sm">{formik.errors.name}</p>
          )}
        </div>

        <div className="mb-5">
          <TextInputField
            className="!bg-inherit !h-12 !text-base  !text-white"
            label="Email :"
            type={"email"}
            name="email"
            marginBottom={5}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="your@example.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-5">
          <TextInputField
            label="Password :"
            className="!bg-inherit !h-12 !text-base  !text-white"
            type={"password"}
            marginBottom={5}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="*** **** ***"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-600 text-sm">{formik.errors.password}</p>
          )}
        </div>
        <div className="mt-2 space-y-5">
          <Button
            marginRight={16}
            type={"submit"}
            className="!w-full !text-base !h-9"
            appearance="primary"
          >
            Sign up
          </Button>
          <p className="text-sm text-gray-500">
            Already have an account ?{" "}
            <span
              onClick={routeHandler}
              className="!text-[#5865F2] cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

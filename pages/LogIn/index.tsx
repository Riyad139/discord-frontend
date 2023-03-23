import { IState } from "@/@types/IState";
import { signIn } from "@/Components/app/authSlice";
import { Button, TextInputField } from "evergreen-ui";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as yup from "yup";

export default function LogIn() {
  const router = useRouter();
  const { user, loading, error } = useSelector((state: IState) => state.Auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const signIngHandler = (data: any) => {
    dispatch(signIn(data));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      signIngHandler(values);
    },
    validationSchema: yup.object({
      email: yup.string().email("enter a valid email").required(),
      password: yup
        .string()
        .min(6, "enter a password atlest 6 characters")
        .required(),
    }),
  });

  const routeHandler = () => {
    router.push("/SignUp");
  };

  if (user && !loading) {
    router.push("/");
  }

  return (
    <div className="w-full bg-[#5865F2] flex justify-center  items-center h-[100vh]">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-800 w-[35rem] rounded-lg px-7 py-9 text-white"
      >
        <div className="mb-4">
          <TextInputField
            className="!bg-mediumDark  !h-12 !text-base  !text-white"
            label="Email :"
            type={"email"}
            name="email"
            marginBottom={5}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="your@example.com"
          />
          {formik.errors.email && (
            <p className="text-xs text-red-700">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-9">
          <TextInputField
            label="Password :"
            className="!bg-inherit !h-12 !text-base  !text-white"
            type={"password"}
            name="password"
            onBlur={formik.handleBlur}
            marginBottom={5}
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="*** **** ***"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-700">{formik.errors.password}</p>
          )}
        </div>
        <div className="mt-2 space-y-5">
          <Button
            marginRight={16}
            type={"submit"}
            className="!w-full !text-base !h-9"
            appearance="primary"
          >
            Log in
          </Button>
          <p className="text-sm text-gray-500">
            need an account ?{" "}
            <span
              onClick={routeHandler}
              className="!text-[#5865F2] cursor-pointer"
            >
              Create account
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

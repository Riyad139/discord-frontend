import { Button, TextInputField } from "evergreen-ui";
import { useRouter } from "next/router";

export default function LogIn() {
  const router = useRouter();
  const routeHandler = () => {
    router.push("/SignUp");
  };
  return (
    <div className="w-full bg-[#5865F2] flex justify-center  items-center h-[100vh]">
      <form className="bg-gray-800 w-[35rem] rounded-lg px-7 py-9 text-white">
        <div>
          <TextInputField
            className="!bg-inherit !h-12 !text-base  !text-white"
            label="Email :"
            type={"email"}
            placeholder="your@example.com"
          />
        </div>

        <div>
          <TextInputField
            label="Password :"
            className="!bg-inherit !h-12 !text-base  !text-white"
            type={"password"}
            placeholder="*** **** ***"
          />
        </div>
        <div className="mt-2 space-y-5">
          <Button
            marginRight={16}
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

import { Button, TextInputField } from "evergreen-ui";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  const routeHandler = () => {
    router.push("/LogIn");
  };

  return (
    <div className="w-full bg-[#5865F2] flex justify-center  items-center h-[100vh]">
      <form className="bg-gray-800 w-[35rem] rounded-lg px-7 py-9 text-white">
        <div className="text-white">
          <TextInputField
            className="!bg-inherit !h-12 !text-base  !text-white"
            label="User name :"
            placeholder="John dee"
          />
        </div>
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

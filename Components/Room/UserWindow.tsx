import { Fab } from "@mui/material";
import classNames from "classnames";

export default function UserWindow(props: { name: string; width: number }) {
  if (props.width < 2)
    return (
      <div className="w-full border border-gray-600 bg-gray-700 flex justify-center items-center">
        {" "}
        <Fab className="bg-mediumBluish text-white p-10 hover:bg-mediumBluish">
          {props.name}
        </Fab>
      </div>
    );
  if (props.width < 3)
    return (
      <div className="w-1/2 bg-gray-700 border border-gray-600 flex justify-center items-center">
        {" "}
        <Fab className="bg-mediumBluish text-white p-10 hover:bg-mediumBluish">
          {props.name}
        </Fab>
      </div>
    );
  if (props.width < 4)
    return (
      <div className="w-1/3 bg-gray-700 border border-gray-600 flex justify-center items-center">
        {" "}
        <Fab className="bg-mediumBluish text-white p-10 hover:bg-mediumBluish">
          {props.name}
        </Fab>
      </div>
    );
  if (props.width < 5)
    return (
      <div className="w-1/4 bg-gray-700 border border-gray-600 flex justify-center items-center">
        {" "}
        <Fab className="bg-mediumBluish text-white p-10 hover:bg-mediumBluish">
          {props.name}
        </Fab>
      </div>
    );
  return <div></div>;
}


import {  CircleXIcon } from "lucide-react";
const AddMoneyFailed = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-bold flex flex-row gap-3 justify-center items-center">
        {" "}
        <CircleXIcon color="red" size={80} /> Add money was failed.
      </h1>
      <p className="text-xl">
        Please close the tab.
      </p>
    </div>
  );
};

export default AddMoneyFailed;

import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="font-semibold text-xl">তুই এখানে আইছস কেন? এইডা কার এলাকা জানস না?</h3>
      <Link to={"/"}>
        <Button className="text-lg" variant={'outline'}>এখনই বাড়ি যা!</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;

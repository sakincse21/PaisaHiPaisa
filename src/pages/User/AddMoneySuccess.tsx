import LoadingScreen from "@/components/layout/LoadingScreen";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { CircleCheckBig } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AddMoneySuccess = () => {
  const { data: userData, isLoading: isUserLoading } =
    useUserInfoQuery(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      // Redirect after 3 seconds when userData is available
      const timer = setTimeout(() => {
        const role = userData?.data?.role;

        navigate(`/${role}`); // fallback
      }, 3000);

      // Cleanup the timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, [userData, navigate]);

  if (isUserLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-bold flex flex-row gap-3 justify-center items-center">
        {" "}
        <CircleCheckBig color="green" size={80} /> Add money was successful.
      </h1>
      <p className="text-xl">
        You will be redirected in 3seconds. Do not close the tab.
      </p>
    </div>
  );
};

export default AddMoneySuccess;

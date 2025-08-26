import LoadingScreen from "@/components/layout/LoadingScreen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/User/user.api";

const CheckWallet = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <LoadingScreen />;
  }
  // console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Card className="w-lg">
        <CardHeader>
          <CardTitle>{data?.data?.role} Wallet</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-5">
            <h3>
              Balance:{" "}
              <span className="font-semibold text-primary text-xl">
                {data?.data?.walletId?.balance}
              </span>{" "}
              BDT
            </h3>
            <h3>
              Wallet ID:{" "}
              <span className="font-semibold  text-lg">
                {data?.data?.walletId?.walletId}
              </span>
            </h3>
          </div>
          <hr />
          <div className="mt-5">
            <h3>
              Name:{" "}
              <span className="font-semibold  text-md">{data?.data?.name}</span>
            </h3>
            <h3>
              Email:{" "}
              <span className="font-semibold  text-md">
                {data?.data?.email}
              </span>
            </h3>
            <h3>
              Status:{" "}
              <span className="font-semibold  text-md">
                {data?.data?.status}
              </span>
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckWallet;

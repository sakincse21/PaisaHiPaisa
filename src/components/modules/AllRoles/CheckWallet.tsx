import LoadingScreen from "@/components/layout/LoadingScreen";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/User/user.api";

const CheckWallet = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Card className="w-full md:w-3xl">
        <CardHeader>
          <CardTitle>{data?.data?.role} Wallet</CardTitle>
        </CardHeader>
        <CardContent>
            <h3>Balance: <span className="font-semibold text-primary text-xl">{data?.data?.walletId?.balance}</span> BDT</h3>
            <h3>Wallet ID: <span className="font-semibold  text-lg">{data?.data?.walletId?.walletId}</span></h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckWallet;

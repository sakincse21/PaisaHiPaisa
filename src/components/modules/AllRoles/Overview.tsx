import LoadingScreen from "@/components/layout/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { Link } from "react-router";
import type { IItem } from "./AllTransactions";
import { getSidebarItems } from "@/lib/getSidebarItems";
import { useAllTransactionsQuery } from "@/redux/features/Transaction/transaction.api";
import type { TRole } from "@/types/user";
import { IRole } from "@/interfaces";
import Joyride, { type CallBackProps, STATUS, EVENTS } from "react-joyride";
import {
  agentSteps,
  defaultOptions,
  userSteps,
} from "@/constants/joyride/joyride-steps";

const Overview = () => {
  const { data: userData, isLoading: isUserLoading } =
    useUserInfoQuery(undefined);

  const { data: transactionData, isLoading: isTransactionLoading } =
    useAllTransactionsQuery({ limit: 3 });

  const role = (userData?.data?.role as TRole)?.toLowerCase();

  if (isUserLoading || isTransactionLoading) {
    return <LoadingScreen />;
  }

  const runTour = true;

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action } = data;

    if (
      (status === STATUS.FINISHED || status === STATUS.SKIPPED) &&
      userData?.data?._id
    ) {
      if (
        type === EVENTS.TOUR_END &&
        (action === "skip" || action === "close")
      ) {
        const tourKey = `joyride-tour-${userData?.data?._id}`;
        localStorage.setItem(tourKey, status);
      }
    }
  };

  const tourKey = `joyride-tour-${userData?.data?._id}`;
  const tourStatus = localStorage.getItem(tourKey);
  const shouldShowTour =
    !tourStatus ||
    (tourStatus !== STATUS.FINISHED && tourStatus !== STATUS.SKIPPED);

  const quickActions = getSidebarItems(userData?.data?.role)[0]?.items;
  const items: IItem[] = transactionData?.data?.data;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      {(userData?.data?.role === IRole.USER ||
        userData?.data?.role === IRole.AGENT) &&
        shouldShowTour && (
          <Joyride
            steps={userData?.data?.role === IRole.USER ? userSteps : agentSteps}
            styles={{ options: defaultOptions }}
            showSkipButton
            run={runTour}
            callback={handleJoyrideCallback}
            locale={{
              skip: "Skip",
              next: "Next",
              back: "Back",
              last: "Finish",
            }}
            continuous={true}
            showProgress={true}
            disableOverlayClose={true}
          />
        )}

      {userData?.data?.role === IRole.ADMIN ||
      userData?.data?.role === IRole.SUPER_ADMIN ? (
        <></>
      ) : (
        <Card className="w-90 mx-auto md:w-5xl user-1 agent-1">
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="flex justify-center gap-2 items-center">
              Your current Balance is:
              <span className="font-semibold text-primary text-xl">
                {` ${userData?.data?.walletId?.balance}`}
              </span>{" "}
              BDT
            </h3>
          </CardContent>
        </Card>
      )}

      <Card className="w-90 mx-auto md:w-5xl user-2 agent-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-center items-center flex-wrap gap-5">
          {quickActions?.map((item, index) => (
            <Link
              to={item.url}
              key={item.url}
              className={`font-semibold agent-${index + 3} user-${index + 3}`}
            >
              <Button
                className="font-semibold"
                type={"button"}
                variant={"default"}
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>

      {userData?.data?.role === IRole.ADMIN ||
      userData?.data?.role === IRole.SUPER_ADMIN ? (
        <></>
      ) : (
        <Card className="w-90 mx-auto md:w-5xl user-6 agent-6">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col justify-around items-center md:w-5xl">
            <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b h-full">
              <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                <TableRow className="hover:bg-transparent">
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto">
                {items?.map((item: IItem) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.from}</TableCell>
                    <TableCell>{item.to}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="text-right">
                      {new Date(item.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="w-full md:w-5xl flex justify-end items-center mt-4 px-8">
              <Link to={`/${role}/all-transactions`}>
                <Button variant={"outline"}>See more</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Overview;

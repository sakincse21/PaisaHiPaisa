import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSummaryQuery } from "@/redux/features/Transaction/transaction.api";
import LoadingScreen from "@/components/layout/LoadingScreen";
import BarChartComponent, { type IBarChartData, type IDataForBarChart } from "../AllRoles/BarChartComponent";

const AgentCharts = () => {
  const {data,isLoading}=useSummaryQuery(undefined);
  if(isLoading){
    return <LoadingScreen />
  }
  console.log("sumamry data",data);
  const tempTransactionChartData:IDataForBarChart[]=data?.data?.map((each: { Type: string; Amount: string; })=>(
    {
      Label: each.Type,
      Amount: each.Amount
    }
  ))
  const transactionChartData:IBarChartData = {
    chartData: tempTransactionChartData,
    footer: "Total transaction amount: BDT",
    title: "Transaction Type/Amount"
  }
  const tempVolumeChartData:IDataForBarChart[]=data?.data?.map((each: { Type: string; Volume: string; })=>(
    {
      Label: each.Type,
      Amount: each.Volume
    }
  ))
  const volumeChartData:IBarChartData = {
    chartData: tempVolumeChartData,
    footer: "Total transactions: ",
    title: "Transaction Type/Volume"
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Card className="w-full md:w-3xl">
        <CardHeader>
          <CardTitle>Last 30Days Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-center flex flex-col md:flex-row justify-around items-center gap-4">
          <div className="flex-1">
            <BarChartComponent {...transactionChartData} />
          </div>
          <div className="flex-1">
            <BarChartComponent {...volumeChartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCharts;

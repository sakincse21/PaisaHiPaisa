import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSendMoneyMutation } from "@/redux/features/Transaction/transaction.api";
import { toast } from "sonner";
import SearchUser from "./SearchUser";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import LoadingScreen from "@/components/layout/LoadingScreen";

const sendMoneySchema = z.object({
  to: z
    .string({ message: "Phone Number must be string" })
    .regex(/^(?:01\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format: 018XXXXXXXX",
    }),
  amount: z
    .number({ message: "Amount should be a valid number." })
    .min(5, { message: "Add money amount cannot be less than 5." }),
  type: z.string({ message: "Transaction type must be a string." }),
});

const SendMoney = () => {
  const [sendMoney] = useSendMoneyMutation();
  const {data:userData, isLoading:isUserLoading} = useUserInfoQuery(undefined);
  
  const form = useForm<z.infer<typeof sendMoneySchema>>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      to: "",
      amount: 5,
      type: "SEND_MONEY",
    },
  });

  const onSubmit = async (formData: z.infer<typeof sendMoneySchema>) => {
    console.log(formData);
    const toastId = toast.loading("Sending money.");
    try {
      const res = await sendMoney(formData).unwrap();
      if (res?.success) {
        toast.success("Sent money successfully.", { id: toastId });
        form.reset();
      } else {
        toast.error(res?.data?.message, { id: toastId });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.data?.message || "Something went wrong. Try again.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  if(isUserLoading){
    return <LoadingScreen />
  }


  return (
    <div className=" h-full flex flex-col justify-center items-center">
      <Card className="w-full md:w-2xl">
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center items-end w-full gap-2">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="gap-1">
                        Receiver No<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="018XXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SearchUser form={form} requiredRole={userData?.data?.role} />
              </div>
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-1">
                      Amount<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendMoney;

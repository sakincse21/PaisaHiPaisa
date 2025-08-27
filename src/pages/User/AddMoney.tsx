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
import { useAddMoneyMutation } from "@/redux/features/Transaction/transaction.api";
import { toast } from "sonner";
import SearchUser from "@/components/modules/AllRoles/SearchUser";
import { IRole } from "@/interfaces";

const addMoneySchema = z.object({
  to: z
    .string({ message: "Phone Number must be string" })
    .regex(/^(?:01\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format: 018XXXXXXXX",
    }),
  amount: z
    .number({ message: "Amount should be a valid number." })
    .min(50, { message: "Add money amount cannot be less than 50." }),
  type: z.string({ message: "Transaction type must be a string." }),
});

const AddMoney = () => {
  const [addMoney] = useAddMoneyMutation();
  const form = useForm<z.infer<typeof addMoneySchema>>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      to: "",
      amount: 0,
      type: "ADD_MONEY",
    },
  });

  const onSubmit = async (formData: z.infer<typeof addMoneySchema>) => {
    // console.log(formData);
    const toastId = toast.loading("Requesting money to agent.");
    try {
      const res = await addMoney(formData).unwrap();
      if (res?.success) {
        toast.success(
          "Requested agent successfully. Contact him now to approve.",
          { id: toastId }
        );
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

  return (
    <div className=" h-full flex flex-col justify-center items-center">
      <Card className="w-full md:w-2xl">
        <CardHeader>
          <CardTitle>Add Money</CardTitle>
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
                        Agent No<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="018XXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SearchUser form={form} requiredRole={IRole.AGENT} />
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

export default AddMoney;

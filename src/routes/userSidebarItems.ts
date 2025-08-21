import AllTransactions from "@/components/modules/AllRoles/AllTransactions";
import AddMoney from "@/pages/User/AddMoney";
import SendMoney from "@/components/modules/AllRoles/SendMoney";
import WithdrawMoney from "@/pages/User/WithdrawMoney";
import type { ISidebarItem } from "@/types";
import CheckWallet from "@/components/modules/AllRoles/CheckWallet";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const userSiderbarItems: ISidebarItem[] = [
  {
    title: "Operations",
    items: [
      {
        title: "Add Money",
        url: "/user/add-money",
        component: AddMoney
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw-money",
        component: WithdrawMoney,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "Check Wallet",
        url: "/user/check-wallet",
        component: CheckWallet
      },
      {
        title: "All Transactions",
        url: "/user/all-transactions",
        component: AllTransactions,
      },
    ],
  },
//   {
//     title: "Profile",
//     items: [
//       {
//         title: "Update Profile",
//         url: "/user/update",
//         component: AddTour,
//       },
//     ],
//   },
];
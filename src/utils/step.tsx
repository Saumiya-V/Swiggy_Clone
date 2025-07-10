import Address from "@/components/checkoutdetails/address/Address";
import  Login from "@/components/checkoutdetails/login/Login";
import  Payment from "@/components/checkoutdetails/payment/Payment";
import  { Locate, User, Wallet } from "lucide-react";

export const steps = [
    {
      icon: <User/>,
      title: "Account",
      component: <Login/>,
    },
    {
      icon: <Locate/>,
      title: "Delivery Address",
      component: <Address/>,
    },
    {
      icon: <Wallet/>,
      title: "Payment",
      component: <Payment/>,
    },
  ];
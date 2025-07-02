import { IceCreamBowlIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton"

const HomeShimmerUI = () => {
  return (
    <>
      <div className="mt-20 mx-auto w-full h-[350px] bg-gray-950 flex flex-col items-center justify-center space-y-4">
      <IceCreamBowlIcon className="w-12 h-12 text-white animate-spin" />
      <p className="text-xl text-white text-center">
        Looking for great food near you...
      </p>
    </div>
    <div className="flex gap-6 flex-wrap ml-30 mt-20">
    {
        Array.from({length:20}).map((_,i)=>{
            return <div key={i} className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
        })
    }
    </div>
    </>
  );
};

export default HomeShimmerUI;



  


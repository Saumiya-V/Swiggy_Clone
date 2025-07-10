import { Home, PlusCircle } from "lucide-react";
import { useState } from "react";
import {useLocation} from '@/hooks/useLocation'

 const Address = () => {
 const [isAddress,setIsAddress]=useState(false)
  const {userAddress} = useLocation()

  return (
    <>
    {
        !isAddress ? (  <div  className="flex gap-6">   <div className="w-64 border border-green-600 p-4 rounded">
        <div className="flex items-center gap-2 mb-2">
          <Home className="text-green-600" />
          <h3 className="text-lg font-semibold">Home</h3>
        </div>
        <p className="text-sm text-gray-700 mb-2">
          {userAddress}
        </p>
        <p className="font-bold text-sm text-gray-800 mb-4">29 MINS</p>
        <button className="bg-green-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-green-700" onClick={()=>setIsAddress(true)}>
          DELIVER HERE
        </button>
      </div>

      <div className="w-64 border border-green-600 p-4 rounded">
        <div className="flex items-center gap-2 mb-2">
          <PlusCircle className="text-green-600" />
          <h3 className="text-lg font-semibold">Add New Address</h3>
        </div>
        <p className="text-sm text-gray-700 mb-2">
          {userAddress}
        </p>
        <p className="font-bold text-sm text-gray-800 mb-4">29 MINS</p>
        <button className="border border-green-600 text-green-600 px-4 py-2 text-sm font-medium rounded hover:bg-green-50">
          Add New
        </button>
      </div></div>):(<div><div className="flex items-center gap-2 mb-2">
          <Home className="text-green-600" />
          <h3 className="text-lg font-semibold">Home</h3>
        </div>
        <p className="text-sm text-gray-700 mb-2">
          {userAddress}
        </p></div>)
    }
    </>
  );
};

export default Address
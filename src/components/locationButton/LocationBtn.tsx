import { useCallback, useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Input } from '../ui/input';
import { ChevronDown, LocateIcon } from 'lucide-react';
import debounce from 'lodash.debounce';
import {useLocation} from '@/hooks/useLocation';
import type { PlaceSuggestion } from '@/types';




const LocationBtn = () => {
const [searchInput,setsearchInput] = useState("")
const [searchResult,setSearchResult] = useState<PlaceSuggestion[]>([])
const [isshowGPS,setisShowGPS] = useState(false)
const {setLocation,userAddress,setUserAddress,loading,error,handleLocationFetch} = useLocation()

const debouncedSearch = useCallback(
  debounce(async (query: string) => {
    if (!query) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/swiggy/autocomplete?input=${query}`
      );
      const data = await res.json();
      const locationList = data?.data
      setSearchResult(locationList);
    } catch (err) {
      console.error("Search failed", err);
    }
  }, 500),
  []
);

useEffect(() => {
  return () => {
    debouncedSearch.cancel();
  };
}, [debouncedSearch]);



  return (
<div>
    <Sheet open={isshowGPS} onOpenChange={setisShowGPS}>
      <SheetTrigger asChild>
      <div onClick={()=>setisShowGPS(true)}>
           <span className='font-[600] float-left border-b border-black hover:text-orange-500'>{userAddress === "Select your location" 
  ? "Other" 
  : userAddress.split(",")[1]?.trim() || userAddress.split(",")[0]}</span>
     <span className='flex'
  title={userAddress}
>
 <p className='truncate block pl-[5px] ml-[5px] max-w-[250px]'> {userAddress}</p>
 <p> <ChevronDown className='text-orange-500'/></p>
</span>
      </div>
      </SheetTrigger>
      <SheetContent side='left' className='z-1000'>
 <div className='mt-30 mx-auto'>
        <Input placeholder="Search for area, street name.." className='w-75 p-6' onChange={(e)=>{
          const value=e.target.value;
          setsearchInput(value)
          debouncedSearch(value)
        }}/>
     {searchInput && searchResult.length > 0 && (<ul className="bg-white shadow rounded mt-2 max-h-60 overflow-y-auto">
  {searchResult.map((result, index) => (
    <li
      key={index}
      className="p-2 hover:bg-orange-100 cursor-pointer"
     onClick={async () => {
  try {

    setUserAddress(result.description);

    const res = await fetch(
      `http://localhost:4000/api/swiggy/address-recommend?place_id=${result.place_id}`
    );
    const data = await res.json();
    const location = data?.data?.[0]?.geometry?.location;
    if(location && location.lat && location.lng){
      setLocation({
        lat:location.lat,
        lng:location.lng
      });
    }else{
      console.log("Invalid Location Data:",location)
    }

    if (location) {
      setisShowGPS(false);
      
    }
  } catch (error) {
    console.error("Failed to fetch detailed address info", error);
  }


  setSearchResult([]);
  setsearchInput('');
}}

    >
      {result.description}
    </li>
  ))}
</ul>) }
        <div className='flex border-1 gap-3 border-black w-75 rounded p-5 cursor-pointer mt-10' onClick={handleLocationFetch}>
          <span><LocateIcon/></span>
          <span>
            <p className='text-md font-bold hover:text-orange-500 '>Get Current Location</p>
            <p className='text-sm'>Using GPS</p>
          </span>
        </div>
         <div className='mt-10 flex flex-col border-1 gap-3 border-black w-75 rounded p-5 cursor-pointer'>
              <p className='text-xs text-gray-400 mb-2'>SAVED ADDRESSES</p>
              <div className='border rounded p-4 cursor-pointer hover:bg-orange-50'>
                <p className='font-medium'>Home</p>
                <p className='text-sm text-gray-600'>
                 {userAddress}
                </p>
              </div>
            </div>
        </div>
         {loading && (<p className='mx-auto'>Getting the location...</p>)}
      {error && (<p className='mx-auto'>{error}</p>)
              }   
      </SheetContent>
    </Sheet>
</div>
  );
};

export default LocationBtn;



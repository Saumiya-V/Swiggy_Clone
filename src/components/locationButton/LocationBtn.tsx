import { useCallback, useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Input } from '../ui/input';
import { ChevronDown, LocateIcon } from 'lucide-react';
import debounce from 'lodash.debounce';
import useLocation from '@/hooks/useLocation';



const LocationBtn = () => {
const [userAddress,setUserAddress] = useState("Select your location")
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")
const [searchInput,setsearchInput] = useState("")
const [searchResult,setSearchResult] = useState<any[]>([])
const [isshowGPS,setisShowGPS] = useState(false)
const {setLocation} = useLocation()



const addressFetch = async (location:{lat:number;lng:number})=>{
  console.log("User Location:",location)

  try{
    const response =await fetch( `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`)
    const data = await response.json()
    const address = data.display_name || "Location Found"
    setUserAddress(address)
  }catch(err){
    console.log("Failed to fetch address",err)
  }
}

const handleLocationFetch = ()=>{
  setLoading(true)
  setError("")

  navigator.geolocation.getCurrentPosition(
    (position)=>{
      const {latitude,longitude}=position.coords
      setLoading(false)
      addressFetch({lat:latitude,lng:longitude})
      setLocation({lat:latitude,lng:longitude})
    },
    (error)=>{
      setLoading(false)
      console.error(error)
      setError("Unable to fetch location, Please allow location access!")
    }
  )
}

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
      onClick={() => {
        setUserAddress(result.description);
        setSearchResult([]);
        setsearchInput("");
        setisShowGPS(false)
        setLocation({ lat: result.lat, lng: result.lng }); 
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
        </div>
         {loading && (<p className='mx-auto'>Getting the location...</p>)}
      {error && (<p className='mx-auto'>{error}</p>)}
      </SheetContent>
    </Sheet>
</div>
  );
};

export default LocationBtn;



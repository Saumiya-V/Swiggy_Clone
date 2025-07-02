import { useEffect, useState } from 'react'
import axios from 'axios'
import { Search, X } from 'lucide-react';

type Suggestion ={
    text:string;
    type:string;
    cloudinaryId:string;
}

const SearchBar = () => {
    const [input,setInput] = useState("")
    const [Suggestions,setSuggestions] = useState<Suggestion[]>([]);
    const [location,setLocation] = useState<{lat:number,lng:number}|null>(null);

    const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/";

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocation(
                    {
                        lat:position.coords.latitude,
                        lng:position.coords.longitude
                    }
                )
            },
            (err)=>{
                console.error("Failed to fetch position",err);
                setLocation({
                    lat: 12.9611,
                    lng: 80.2078,
                })
            }
        )
    },[]);

   useEffect(()=>{
    const delay = setTimeout(async()=>{
        if(!input || !location) return;

        try{
            const res = await axios.get("http://localhost:4000/api/search-suggest",{
                params:{
                    str:input,
                    lat:location.lat,
                    lng:location.lng,
                }
            });

            const data = res?.data?.data?.suggestions || []
            setSuggestions(data)
        }catch (err) {
        console.error("Failed to fetch suggestions:", err);
      }
    },300)
  
    return ()=>clearTimeout(delay)

   },[input,location]);


  return (
    <div>
       <div>
        <div className='mt-35 w-[850px] p-3 border-1 border-gray-400 mx-auto flex justify-between rounded'>
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Search for restaurants and Food' className='w-[800px] outline-none border-none font-bold'/>
            {input.length === 0 ? (<Search/>):(<X className='cursor-pointer' onClick={()=>setInput("")}/>)}
        </div>
        {
             input.length === 0 ? <div></div> : (
                <ul className=' bg-white rounded p-4 space-y-2 w-[850px] mx-auto mt-3'>
                    {
                        Suggestions.map((suggest)=>{
                            return <li  key={suggest.text} className='flex gap-4 items-center pb-2 cursor-pointer hover:bg-gray-200'>
                                <div>
                                    <img src={`${CDN_URL}${suggest.cloudinaryId}`} alt="food-image" className='h-16 w-16 object-cover rounded'/>
                                </div>
                                <div>
                                    <p className="font-medium">{suggest.text}</p>
                                    <p className="text-sm text-gray-500">{suggest.type}</p>
                                </div>
                            </li>
                        })
                    }
                </ul>
            )
        }
       </div>
    </div>
  )
}

export default SearchBar
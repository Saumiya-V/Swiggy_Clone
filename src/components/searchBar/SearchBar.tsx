import { useEffect, useState } from 'react'
import axios from 'axios'
import { Search, X } from 'lucide-react';
import { formatter } from '@/pages/menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store/store';
import type { cartItem } from '@/types';
import { addToCart, decreaseQty } from '@/redux/slice/cartSlice';
import { Button } from '../ui/button';

type Suggestion ={
    text:string;
    type:string;
    cloudinaryId:string;
}

type Dish = {
  card: {
    card: {
      info: {
        id: string;
        name: string;
        imageId: string;
        price: number;
      };
      restaurant:{
        info:{
            name:string;
            avgRating:number;
            sla:{
            slaString:string;
        }
        };
      }
    };
  };
};


const SearchBar = () => {
    const [input,setInput] = useState("")
    const [Suggestions,setSuggestions] = useState<Suggestion[]>([]);
    const [location,setLocation] = useState<{lat:number,lng:number}|null>(null);
    const [dishList,setDishList] = useState<Dish[]>([])
    const [isDispaly,setIsDisplay]=useState(false)
    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

  const onAddToCart =(item:cartItem)=>{
    dispatch(addToCart(item))
  }


  const handleDecrease = (id: string) => {
    dispatch(decreaseQty(id))
  }


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

   const handleSearch = async()=>{
      if(!input) return

      try{
        const dish = await axios.get("http://localhost:4000/api/search",{
            params:{
                lat:location?.lat,
                lng:location?.lng,
                str:input
            }
        });
        const cards = dish?.data?.data?.cards || []
        const dishCards = cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards || []
        console.log('dishcards',dishCards)
        dishCards.shift()
        console.log(dishCards)
        setDishList(dishCards)
      }catch(error){
        console.error(error)
      }
   }

  return (
    <div>
       <div>
        <div className='mt-35 w-[850px] p-3 border-1 border-gray-400 mx-auto flex justify-between rounded '>
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Search for restaurants and Food' className='w-[800px] outline-none border-none font-bold'/>
            {input.length === 0 ? (<Search/>):(<X className='cursor-pointer' onClick={()=>{setInput("");
                setIsDisplay(false)}
            }/>)}
        </div>
        {
             input.length === 0 ? <div></div> : (
                <ul className=' bg-white rounded p-4 space-y-2 w-[850px] mx-auto mt-3'>
                    {
                        Suggestions.map((suggest)=>{
                            return <li onClick={()=>{setInput(suggest.text);
                                setIsDisplay(true) 
                                setSuggestions([]);
                                handleSearch();
                            
                            }} key={suggest.text} className='flex gap-4 items-center pb-2 cursor-pointer hover:bg-gray-200'>
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
       {
        isDispaly && (
        <div className=' w-[850px] p-3 border border-gray-400 mx-auto grid grid-cols-2 gap-5 bg-gray-200'>
        {
            dishList.map((dish)=>{
                const info = dish?.card?.card?.info
                const resName = dish?.card?.card?.restaurant?.info?.name
                const rating = dish?.card?.card?.restaurant?.info?.avgRating
                const deliveryTime = dish?.card?.card?.restaurant?.info?.sla?.slaString
                return <div key={info.id} className='border p-5 bg-white rounded-2xl'>
                   <div className='border-b border-dashed border-sm mb-5'>
                    <p className='font-bold text-sm text-gray-700'>By {resName}</p>
                   <p className='text-sm'>⭐{rating} 🚚 {deliveryTime}</p>
                   </div>
                   <div className='grid grid-cols-2 gap-25'>
                    <div>
                    <p className='text-md font-bold'>{info.name}</p>
                   <p className='text-md font-bold'>{formatter.format(info.price/100)}</p>
                   </div>
                   <div>
                    <img src={`${CDN_URL}${info.imageId}`} className='h-25 w-30 rounded-2xl'/>
                    {(() => {
      const cartItem = cart.find(ci => ci.id === info.id);
      if (cartItem) {
        return (
          <div className="relative w-24 bg-white text-green-500 font-bold border-2 border-gray-300 top-2 left-3 shadow-sm">
            <div className='grid grid-cols-3'>
              <button
                onClick={() => handleDecrease(info.id)}
                className="font-bold"
              >
                -
              </button>
              <span className='text-center'>{cartItem.quantity}</span>
              <button
                onClick={() => onAddToCart(info)}
                className="font-bold"
              >
                +
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <Button
            onClick={() => onAddToCart(info)}
            className="relative w-24 bg-white text-green-500 font-bold border-2 border-gray-300 top-2 left-3 shadow-sm hover:bg-gray-200"
          >
            ADD
          </Button>
        );
      }
    })()}
                   </div>
                   </div>
                </div>

            })
        }
       </div>
        )
       }
    </div>
  )
}

export default SearchBar
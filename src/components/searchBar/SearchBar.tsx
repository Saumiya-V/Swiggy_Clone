import { useEffect, useState } from 'react'
import axios from 'axios'
import { Search, X } from 'lucide-react';
import { formatter } from '@/pages/menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store/store';
import {type ResList, type cartItem, type Dish, type Suggestion } from '@/types';
import { addToCart, decreaseQty } from '@/redux/slice/cartSlice';
import { Button } from '../ui/button';
import { CDN_URL } from '@/constants/url/URL';
import ToggleButton from '../toggleButton/ToggleButton';
import { Badge } from '../ui/badge';
import { Link } from '@tanstack/react-router';


const SearchBar = () => {
    const [input,setInput] = useState("")
    const [Suggestions,setSuggestions] = useState<Suggestion[]>([]);
    const [location,setLocation] = useState<{lat:number,lng:number}|null>(null);
    const [dishList,setDishList] = useState<Dish[]>([])
    const [isDispaly,setIsDisplay]=useState(false)
      const [selected, setSelected] = useState<'Restaurants' | 'Dishes'>('Restaurants');
    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

  const onAddToCart =(item:cartItem)=>{
    dispatch(addToCart(item))
  }


  const handleDecrease = (id: string) => {
    dispatch(decreaseQty(id))
  }

 
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
            console.log('Suggestion data:',data)
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
        <div>
          <ToggleButton selected={selected} setSelected={setSelected}/>
          <div className=' w-[850px] p-3 border border-gray-400 mx-auto grid grid-cols-2 gap-5 bg-gray-200'>
        {
           selected === 'Dishes'? dishList.map((dish)=>{
                const info = dish?.card?.card?.info
                const resName = dish?.card?.card?.restaurant?.info?.name
                const rating = dish?.card?.card?.restaurant?.info?.avgRatingString
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

            }): dishList.map((res)=>{
              const info = res.card.card.restaurant.info
              const discount = info.aggregatedDiscountInfoV3
              return <Link to={`/menu/${info.id}`}>
              <div className='border p-5 bg-white rounded-2xl flex gap-8'>
                   <div className="max-w-75 cursor-pointer relative flex items-center justify-center duration-300 hover:scale-110">
               {
                  discount && (
                    <Badge className="text-white top-20  absolute  grid rounded-xl shadow-lg font-bold bg-white text-orange-500 "><p>{discount.header}</p>
                    <p>{discount.subHeader}</p>
                    </Badge>
                  )
                }
                  <img src={`${CDN_URL}${info.cloudinaryImageId}`} alt={info.name} className='h-25 w-35  rounded-2xl'/>
                   
                 </div>
                 <div className='flex flex-col gap-2'>
                  <p className='text-md font-bold'>{info.name}</p>
                  <div className='flex flex-wrap gap-2 text-sm text-gray-600'>
                    <p>⭐{info.avgRatingString}</p>
                    <p>🚚{info.sla.slaString}</p>
                    <p >{formatter.format(Number(info.costForTwo)/100)} for two</p>
                  </div>
                  <p className='text-sm text-gray-600'>{info.cuisines.join(', ')}</p>
                 </div>
              </div>
            </Link>
            })
        }
       </div>
        </div>
        )
       }
    </div>
  )
}

export default SearchBar
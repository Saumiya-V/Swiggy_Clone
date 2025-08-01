import { Button } from '@/components/ui/button';
import { CDN_URL } from '@/constants/url/URL';
import {useLocation} from '@/hooks/useLocation';
import { useParams } from '@tanstack/react-router';
import { SoupIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type {  cartItem, MenuItem } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQty } from '@/redux/slice/cartSlice';
import type { RootState } from '@/redux/store/store';

export const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

const Menu = () => {
  const { location, error: locationError} = useLocation();
  const { id } = useParams({ from: '/menu/$id' });
   const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const onAddToCart =(item:cartItem)=>{
    dispatch(addToCart(item))
  }


  const handleDecrease = (id: string) => {
    dispatch(decreaseQty(id))
  }

  const fetchMenu = async () => {
      const res = await fetch(
        `http://localhost:4000/api/menu?restaurantId=${id}&lat=${location?.lat}&lng=${location?.lng}`
      );
      if (!res.ok) throw new Error('Failed to fetch menu');
      const data = await res.json();

      const cards =
        data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const recommendedCard = cards.find(
        (c: any) => c.card?.card?.title === 'Recommended'
      );

      const items =
        recommendedCard?.card?.card?.itemCards?.map(
          (item: any) => item.card?.info
        ) || [];

      const title = data?.data?.cards[0]?.card?.card?.text || "Restaurant";
      return { items, title };
    }

  const {
    data: menuItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey:["MenuData",id,location],
    queryFn:fetchMenu,
     enabled: !!id && !!location?.lat && !!location?.lng, 
  });

  if (isLoading)
    return (
      <div className="mt-50 flex flex-col justify-center items-center">
        <SoupIcon className="w-10 h-10 animate-spin text-orange-500" />
        <p className="font-semibold text-xl">Loading...</p>
      </div>
    );

  if (isError || locationError)
    return <div className="text-red-500">{error?.message || locationError}</div>;

 
  const safeMenuItems = menuItems?.items ?? [];

  return (
    <div className="mt-30 mx-auto max-w-[600px]">
      <h1 className='text-xl mb-5 font-bold'>{ menuItems?.title }</h1>
      <h2 className="text-md font-semibold mb-4">
        {safeMenuItems.length > 0 && 'Recommended'}
      </h2>
      <div className="flex flex-col gap-6">
        {!safeMenuItems? (
          <p className="flex justify-center align-center text-xl font-bold mt-50">
            This Restaurant is out of service
          </p>
        ) : (
          safeMenuItems.map((item: MenuItem) => (
            <div key={item.id} className="flex justify-between border-b pb-4">
              <div className="flex flex-col max-w-[70%] mb-10">
          <h3 className="font-bold">{item.name}</h3>
          <p>{formatter.format(item.price / 100)}</p>
          <p className='text-green-600'>
            ⭐{item.ratings?.aggregatedRating?.rating ?? 'N/A'} (
            {item.ratings?.aggregatedRating?.ratingCount ?? '0'})
          </p>
          <p className="text-md text-gray-600 font-semibold truncate" title={item.description}>{item.description}</p>
              </div>
              {item.imageId && (
          <div>
            <img
              src={`${CDN_URL}${item.imageId}`}
              alt="food"
              className="w-[120px] h-[120px] object-cover rounded absolute"
            />
         {item.imageId && (
  <div className="relative">
    <img
      src={`${CDN_URL}${item.imageId}`}
      alt="food"
      className="w-[120px] h-[120px] object-cover rounded"
    />

    {(() => {
      const cartItem = cart.find(ci => ci.id === item.id);
      if (cartItem) {
        return (
          <div className="relative w-24 bg-white text-green-500 font-bold border-2 border-gray-300 top-2 left-3 shadow-sm">
            <div className='grid grid-cols-3'>
              <button
                onClick={() => handleDecrease(item.id)}
                className="font-bold"
              >
                -
              </button>
              <span className='text-center'>{cartItem.quantity}</span>
              <button
                onClick={() => onAddToCart(item)}
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
            onClick={() => onAddToCart(item)}
            className="relative w-24 bg-white text-green-500 font-bold border-2 border-gray-300 top-2 left-3 shadow-sm hover:bg-gray-200"
          >
            ADD
          </Button>
        );
      }
    })()}
  </div>
)}     
          </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;

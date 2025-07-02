import { useQuery } from '@tanstack/react-query';
import type {  MenuQueryResult } from '@/types';



export const useMenuQuery = (id: string, lat: number, lng: number) => {
  return useQuery<MenuQueryResult, Error>({
    queryKey: ['menu', id, lat, lng],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4000/api/menu?restaurantId=${id}&lat=${lat}&lng=${lng}`
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

      const title = data?.data?.cards[1]?.card?.card?.text || "Popular Restaurant";
      return { items, title };
    },
    enabled: !!id && !!lat && !!lng, 
  });
};

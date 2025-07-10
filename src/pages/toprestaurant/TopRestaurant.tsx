import { useQuery } from "@tanstack/react-query";
import { CDN_URL } from "@/constants/url/URL";
import { useLocation } from "@/hooks/useLocation";
import type { ResList } from "@/types";
import { Link } from "@tanstack/react-router";


const TopRestaurant = () => {
  const { location, error } = useLocation();

  const fetchTopRestaurants = async (lat: number, lng: number): Promise<{
  title: string;
  restaurants: ResList[];
}> => {
  const res = await fetch(`http://localhost:4000/api/swiggy?lat=${lat}&lng=${lng}`);
  const data = await res.json();
  localStorage.setItem("swiggyData", JSON.stringify(data));

  const cards = data?.data?.cards || [];

  const title = cards[1]?.card?.card?.header?.title || "Top Restaurants";

  const restaurants =
    cards.find(
      (card: any) => card?.card?.card?.id === "restaurant_grid_listing_v2"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  return { title, restaurants };
};


  const {
    data,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["topRestaurants", location],
    queryFn: () => {
      if (!location) return Promise.resolve({ title: "", restaurants: [] });
      return fetchTopRestaurants(location.lat, location.lng);
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 5, 
  });

  if (error || isError) {
    return <p className="text-red-500 ml-40 mt-10">{error || queryError?.message}</p>;
  }


  return (
    <div className="mt-15 ml-40">
      <h2 className="text-xl font-bold mb-4">{data?.title}</h2>
      <div className="flex gap-6 overflow-x-auto no-scrollbar mr-30 border-b">
        {data?.restaurants.map((res) => {
          const info = res.info;
          return (
            <Link to={`/menu/${info.id}`} key={info.id}>
              <div className="min-w-[300px] cursor-pointer duration-300 hover:scale-110">
                <img
                  className="h-50 min-w-[300px] object-cover rounded-lg"
                  src={`${CDN_URL}${info.cloudinaryImageId}`}
                  alt={info.name}
                />
                <h4 className="font-bold mt-2">{info.name}</h4>
                <p>
                  ⭐ {info.avgRatingString} 🚚 {info.sla.slaString}
                </p>
                <p className="text-sm text-gray-600">
                  {info.cuisines.join(", ")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopRestaurant;

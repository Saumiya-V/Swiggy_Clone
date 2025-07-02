import { useQuery } from "@tanstack/react-query";
import { CDN_URL } from "@/constants/url/URL";
import useLocation from "@/hooks/useLocation";
import type { ResList } from "@/types";
import { Link } from "@tanstack/react-router";

// Fetch and parse online restaurants and title
const fetchOnlineRestaurants = async (lat: number, lng: number): Promise<{
  restaurants: ResList[];
  title: string;
}> => {
  const res = await fetch(`http://localhost:4000/api/swiggy?lat=${lat}&lng=${lng}`);
  const data = await res.json();
  localStorage.setItem("swiggyData", JSON.stringify(data));

  const cards = data?.data?.cards || [];

  const restaurants =
    cards.find(
      (card: any) => card?.card?.card?.id === "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  const title = cards[2]?.card?.card?.title || "Popular Restaurants";

  return { restaurants, title };
};

const OnlineRestaurants = () => {
  const {  error, location } = useLocation();

  const {
    data,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["onlineRestaurants", location],
    queryFn: () => {
      if (!location) return Promise.resolve({ restaurants: [], title: "" });
      return fetchOnlineRestaurants(location.lat, location.lng);
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 5, 
  });

  if (error || isError) {
    return <p className="ml-40 text-red-500 mt-10">{error || queryError?.message}</p>;
  }

  if (isLoading) {
    return <div className="animate-spin w-25 h-25 flex justify-center items-center"></div>
  }

  return (
    <div className="mt-25 ml-40">
      <h2 className="text-xl font-bold mb-4">{data?.title}</h2>
      <div className="flex gap-6 flex-wrap mr-20">
        {data?.restaurants.map((res) => {
          const info = res.info;
          return (
            <Link to={`/menu/${info.id}`} key={info.id}>
              <div className="max-w-75 cursor-pointer duration-300 hover:scale-110">
                <img
                  className="h-50 min-w-[300px] object-cover rounded-lg"
                  src={`${CDN_URL}${info.cloudinaryImageId}`}
                  alt={info.name}
                />
                <h4 className="font-bold mt-2">{info.name}</h4>
                <p>
                  ⭐ {info.avgRatingString} 🚚 {info.sla.slaString}
                </p>
                <p className="text-sm text-gray-600">{info.cuisines.join(", ")}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OnlineRestaurants;

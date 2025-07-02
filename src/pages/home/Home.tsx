import { useQuery } from "@tanstack/react-query";
import TopRestaurant from "../toprestaurant/TopRestaurant";
import OnlineRestaurants from "../onlineDelivery/OnlineRestaurants";
import HomeShimmerUI from "./HomeShimmerUI";
import useLocation from "@/hooks/useLocation";
import type { ItemList } from "@/types";
import { CDN_URL } from "@/constants/url/URL";
import { Link } from "@tanstack/react-router";

const fetchHomeData = async (lat: number, lng: number): Promise<ItemList[]> => {
  const res = await fetch(`http://localhost:4000/api/swiggy?lat=${lat}&lng=${lng}`);
  const data = await res.json();
  const cards = data?.data?.cards || [];

  const itemList = cards.find(
    (card: any) => card?.card?.card?.imageGridCards?.info
  )?.card?.card?.imageGridCards?.info;

  return itemList || [];
};

const Home = () => {
  const {  error, location } = useLocation();

  const {
    data: item = [],
    isLoading,
    isError,
    error: queryError,
  } = useQuery<ItemList[]>({
    queryKey: ["homeData", location],
    queryFn: () => {
      if (!location) return Promise.resolve([]);
      return fetchHomeData(location.lat, location.lng);
    },
    enabled: !!location, 
    staleTime: 1000 * 60 * 5, 
  });

  if (error || isError) {
    return <p className="text-red-500 ml-40 mt-10">{error || queryError?.message}</p>;
  }

  return (
    <>
      {isLoading ? (
        <HomeShimmerUI />
      ) : (
        <>
          <div className="mt-25 ml-40">
            <h2 className="text-xl font-bold mb-4">What's on your mind?</h2>
            <ul className="flex overflow-x-auto gap-3 pr-4 mr-30 no-scrollbar border-b ">
              {item.map((i) => (
                <Link
                  to={i.id}
                  key={i.imageId}
                  className="flex-shrink-0 flex flex-col items-center min-w-[80px] cursor-pointer"
                >
                  <li>
                    <img
                      className="h-45"
                      src={`${CDN_URL}${i.imageId}`}
                      alt={i.text}
                    />
                    <p className="text-center text-sm mt-2">{i.text}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <TopRestaurant />
          <OnlineRestaurants />
        </>
      )}
    </>
  );
};

export default Home;

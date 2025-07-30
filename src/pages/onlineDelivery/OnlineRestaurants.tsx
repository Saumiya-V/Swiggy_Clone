import { useQuery } from "@tanstack/react-query";
import { CDN_URL } from "@/constants/url/URL";
import { useLocation } from "@/hooks/useLocation";
import type { FaceList, ResList, SortConfig } from "@/types";
import { Link } from "@tanstack/react-router";
import FilterModal from "@/components/filter/FilterModal";
import {  useState } from "react";
import { Badge } from "@/components/ui/badge";


const OnlineRestaurants = () => {
  const {  error, location } = useLocation();
  const [appliedFilters,setAppliedFilters] = useState<Record<string,string[]>>({})
  
  const fetchOnlineRestaurants = async (lat: number, lng: number): Promise<{
  restaurants: ResList[];
  title: string;
  filteredDataTitle: {
    sortByData : SortConfig[],
    categoryFilter:FaceList[]
  };
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

  const sortCard = data?.data?.cards?.find(
    (card: any) => card?.card?.card?.sortConfigs
  );

  const faceListCard = data?.data?.cards?.find(
    (card: any) => card?.card?.card?.facetList
  );
  const sortByData = sortCard?.card?.card?.sortConfigs || [];
  const faceList = faceListCard?.card?.card?.facetList || [] ;
  const filteredDataTitle = {
    sortByData:sortByData,
    categoryFilter:faceList
  }

  console.log("✅ sortConfigs found:", sortByData);
  console.log("✅ facelist:",faceList);


  return { restaurants, title , filteredDataTitle};
};

  const {
    data,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["onlineRestaurants", location?.lat, location?.lng],
    queryFn: () => {
      if (!location) {
        return Promise.resolve({
          restaurants: [],
          title: "",
          filteredDataTitle: {
            sortByData: [],
            categoryFilter: []
          }
        });
      }
      return fetchOnlineRestaurants(location.lat, location.lng);
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 5, 
  });

  if (error || isError) {
    return <p className="ml-40 text-red-500 mt-10">{error || queryError?.message}</p>;
  }

  if (isLoading) {
    return <div className="animate-spin w-25 h-25 mt-45 flex justify-center items-center"></div>
  }

  console.log("Current location in OnlineRestaurants:", location);

  const filteredRestaurants = ()=>{
    if(!appliedFilters || Object.keys(appliedFilters).length === 0) return data?.restaurants;

    return data?.restaurants.filter((res)=>{
      const cuisinesFilter = appliedFilters["Cuisines"];
      if(cuisinesFilter && cuisinesFilter.length > 0){
        const match = cuisinesFilter.some((cuisine)=>
        res.info.cuisines.includes(cuisine));
        if(!match) return false
      };
     return true;
    });
  }


  const handleClearFilters = () => {
  setAppliedFilters({});
};



  return (
    <div className="mt-25 ml-40 mb-20">
      <h2 className="text-xl font-bold mb-4">{data?.title}</h2>
       <FilterModal 
       onApply={(filters)=>setAppliedFilters(filters)}
       onClear={handleClearFilters}
       data={data?.filteredDataTitle ?? { sortByData: [], categoryFilter: [] }}/>
      <div className="flex gap-6 flex-wrap mr-20">
        {(filteredRestaurants() ?? data?.restaurants ?? []).map((res) => {
          const info = res.info;
          const discount = info.aggregatedDiscountInfoV3
          
          return (
            <Link to={`/menu/${info.id}`} key={info.id}>
              <div className="max-w-75 cursor-pointer relative duration-300 hover:scale-110">
                {
                  discount && (
                    <Badge className="w-35 text-white absolute p-2  top-40 rounded-xl shadow-lg font-bold">{discount.header+" ".concat(discount.subHeader)}</Badge>
                  )
                }
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

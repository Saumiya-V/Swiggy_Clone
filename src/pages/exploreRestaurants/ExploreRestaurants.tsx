import { useLocation } from "@/hooks/useLocation";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import { CDN_URL } from "@/constants/url/URL";

export type RestaurantInfo = {
  id: string | number;
  name: string;
  cloudinaryImageId: string;
  locality: string;
  areaName: string;
  costForTwo?: string;
  cuisines?: string[];
  avgRating?: number;
  parentId?: string;
  totalRatingsString?: string;
};


const fetchRestaurants = async ({
  lat,
  lng,
  collectionId,
  tag,
}: {
  lat: number;
  lng: number;
  collectionId: string;
  tag?: string;
}) => {
  let url = `http://localhost:4000/api/restaurants?lat=${lat}&lng=${lng}&collection=${collectionId}`;
  if (tag) {
    url += `&tags=${encodeURIComponent(tag)}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch restaurants");
  return res.json();
};

const ExploreRestaurants = () => {
  const { collectionId } = useParams({ from: "/itemBasedRestaurants/$collectionId" });
const { tags } = useSearch({ from: "/itemBasedRestaurants/$collectionId" });

  const { error: locationError, location } = useLocation();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["restaurants", { lat: location?.lat, lng: location?.lng, collectionId, tags }],
    queryFn: () =>
      fetchRestaurants({
        lat: location!.lat,
        lng: location!.lng,
        collectionId,
        tag: tags,
      }),
    enabled: !!location,
  });

  const { title, description, restaurants } = useMemo(() => {
    const cards = data?.data?.cards || [];
    const title = cards[0]?.card?.card?.title || "Explore Restaurants";
    const description = cards[0]?.card?.card?.description || "";
      const restaurants = cards
    .filter((c: any) => c.card?.card?.info)
    .map((c: any) => c.card.card.info);
    return { title, description, restaurants };
  }, [data]);

  if (locationError) return <p className="ml-40 text-red-500 mt-10">{locationError}</p>;
  if (isLoading) return <p className="ml-40 mt-10">Loading restaurants...</p>;
  if (isError) return <p className="ml-40 text-red-500 mt-10">Error: {error?.message}</p>;

  return (
    <div className="mt-25 ml-40">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-l text-gray-500 font-semibold mb-4">{description}</p>
      <h3 className="text-xl font-bold mb-4">Restaurants to Explore</h3>
      {restaurants.length === 0 ? (
        <p className="text-gray-500 mt-4">No restaurants found for this category.</p>
      ) : (
        <div className="flex gap-6 flex-wrap mr-20 mt-6">
          {restaurants.map((res: RestaurantInfo) => {
            
            return (
              <Link key={res.id} to={`/menu/${res.id}`}>
                <div className="max-w-75 cursor-pointer duration-300 hover:scale-110">
                  <img
                    className="h-50 min-w-[300px] object-cover rounded-lg"
                    src={`${CDN_URL}${res.cloudinaryImageId}`}
                    alt={res.name}
                  />
                  <h4 className="font-bold mt-2">{res.name}</h4>
                  <p>
                    ⭐ {res.totalRatingsString} 
                  </p>
                  <p className="text-sm text-gray-600">{res.cuisines?.join(", ")}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExploreRestaurants;

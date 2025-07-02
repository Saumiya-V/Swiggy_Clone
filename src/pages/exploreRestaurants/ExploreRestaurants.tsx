
import useLocation from '@/hooks/useLocation';
import { useEffect, useState } from 'react';

type ExploreRestaurantsProps = {
  collectionId: string;
  tag?: string;
};

const ExploreRestaurants = ({ collectionId, tag = "layout_CCS_Dosa" }: ExploreRestaurantsProps) => {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setError, error, location } = useLocation();

  useEffect(() => {
    if (!location) return;

    const { lat, lng } = location;

    fetch(
      `http://localhost:5000/api/restaurants?lat=${lat}&lng=${lng}&collection=750131&tags=${tag}`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('swiggyData', JSON.stringify(data));
        const cards = data?.data?.cards || [];

        const Title = cards[1]?.card?.card?.title;
        const Description = cards[1]?.card?.card?.description;
        console.log(Title)
        console.log(Description)
        setTitle(Title);
        setDescription(Description);

       
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setError("Failed to fetch Swiggy restaurant data.");
      });
  }, [location, collectionId, tag]);

  if (error) {
    return <p className="ml-40 text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="mt-25 ml-40">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p>{description}</p>
      {/* <div className="flex gap-6 flex-wrap mr-20 mt-6">
        {onlineRestaurants.map((res) => {
          const info = res.info;
          return (
            <Link key={info.id} to={`/menu/${info.id}`}>
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
      </div> */}
    </div>
  );
};

export default ExploreRestaurants;

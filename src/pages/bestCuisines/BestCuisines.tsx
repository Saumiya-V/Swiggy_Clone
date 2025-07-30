import { Button } from "@/components/ui/button";
import { useLocation } from "@/hooks/useLocation";
import {type Brands} from "@/types";
import { Link } from "@tanstack/react-router";


import { useEffect, useState } from "react";
const BestCuisines = () => {
   const { location } = useLocation();
   const [title, setTitle] = useState<string>("");
   const [brands,setBrands]=useState<Brands[]>([])
   const [cuisinesNear,setcuisinesNear]=useState<Brands[]>([])
   const [cuisinesTitle,setcuisinesTitle]=useState<String>("")
   const [showallBrands,setshowallBrands]=useState(false)
    const [showallCuisines,setshowallCuisines]=useState(false)

   useEffect(() => {
      const fetchHomeData = async () => {
         const res = await fetch(`http://localhost:4000/api/swiggy?lat=${location?.lat}&lng=${location?.lng}`);
         const data = await res.json();
         const cards = data?.data?.cards || [];
         const bestPlacesCard = cards.find(
  (item:any) => item?.card?.card?.title === "Best Places to Eat Across Cities"
);
const bestPlacesTitle = bestPlacesCard?.card?.card?.title || "";
setTitle(bestPlacesTitle);
const brandsArr = bestPlacesCard?.card?.card?.brands || []
setBrands(brandsArr)
const bestCuisinesCard = cards.find((item:any)=>item?.card?.card?.title === "Best Cuisines Near Me");
const bestCuisinesTitle = bestCuisinesCard?.card?.card?.title || "";
setcuisinesTitle(bestCuisinesTitle)
const cuisineArr = bestCuisinesCard?.card?.card?.brands || []
setcuisinesNear(cuisineArr)
      };

      if (location?.lat && location?.lng) {
         fetchHomeData();
      }
   }, [location?.lat, location?.lng]);

   return (
      <div className="mt-25 ml-40 mb-20">
         <p className="text-2xl font-bold mb-5">{title}</p>
         <div className="grid grid-cols-4 gap-5 mr-20">
        {
           (showallBrands ? brands:brands.slice(0,8)).map((brand)=>{
                return <Link to={brand.link} key={brand.text}><div className="text-center font-bold border-2 p-5 text-gray-500">{brand.text}</div></Link>
            })
         }
         </div>
         {
            brands.length > 8 && (
                <Button className="mt-5 bg-white text-orange-500" onClick={()=>setshowallBrands(prev=>!prev)}>
                    {showallBrands ? "Show Less":"Show More"}
                </Button>
            )
         }
           <p className="text-2xl font-bold mb-5 mt-5">{cuisinesTitle}</p>
         <div className="grid grid-cols-4 gap-5 mr-20">
        {
           (showallCuisines ? cuisinesNear:cuisinesNear.slice(0,8)).map((cuisines)=>{
                return <Link to={cuisines.link} key={cuisines.text}><div className="text-center font-bold border-2 p-5 text-gray-500">{cuisines.text}</div></Link>
            })
         }
         </div>
         {
            cuisinesNear.length > 8 && (
                <Button className="mt-5 bg-white text-orange-500" onClick={()=>setshowallCuisines(prev=>!prev)}>
                    {showallCuisines ? "Show Less":"Show More"}
                </Button>
            )
         }
      </div>
   );
}

export default BestCuisines
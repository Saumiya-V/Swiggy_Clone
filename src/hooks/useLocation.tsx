import  { createContext, useContext, useState,type ReactNode,useEffect } from "react";

export interface Location {
  lat: number;
  lng: number;
}

interface LocationContextType {
  location: Location | null;
  setLocation: (loc: Location) => void;
  userAddress: string;
  setUserAddress: (address: string) => void;
  loading: boolean;
  error: string | null;
  handleLocationFetch: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [userAddress, setUserAddress] = useState<string>("Select your location");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 
const addressFetch = async (location:{lat:number;lng:number})=>{
  console.log("User Location:",location)

  try{
    const response =await fetch( `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`)
    const data = await response.json()
    const address = data.display_name || "Location Found"
    setUserAddress(address)
  }catch(err){
    console.log("Failed to fetch address",err)
  }
}

const handleLocationFetch = ()=>{
  setLoading(true)
  setError("")

  navigator.geolocation.getCurrentPosition(
    (position)=>{
      const {latitude,longitude}=position.coords
      setLoading(false)
      addressFetch({lat:latitude,lng:longitude})
      setLocation({lat:latitude,lng:longitude})
    },
    (error)=>{
      setLoading(false)
      console.error(error)
      setError("Unable to fetch location, Please allow location access!")
    }
  )
}


useEffect(() => {
  if (!location) {
    handleLocationFetch();
  }
}, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        userAddress,
        setUserAddress,
        loading,
        error,
        handleLocationFetch,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

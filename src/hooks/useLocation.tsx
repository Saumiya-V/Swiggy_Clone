import { useEffect, useState } from 'react'

const useLocation = () => {
      const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
      const [error, setError] = useState("");

    useEffect(() => {
          
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ lat: latitude, lng: longitude });
             
            },
            (err) => {
              console.error("Location error:", err.message);
              setError("Location access denied or unavailable.");
            }
          );
        }, []);
  return {
    location,
    setLocation,
    error,
    setError
  };
}

export default useLocation
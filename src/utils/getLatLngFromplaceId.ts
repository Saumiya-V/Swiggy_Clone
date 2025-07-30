export const getLatLngFromPlaceId = async (placeId: string) => {
  const response = await fetch(
    `http://localhost:4000/api/swiggy/address-recommend?place_id=${placeId}`
  );
  const data = await response.json();
  const info = data?.data?.[0];

  if (!info?.geometry?.location) {
    throw new Error("Could not find location from place ID");
  }

  const lat = info.geometry.location.lat;
  const lng = info.geometry.location.lng;

  return { lat, lng };
};

import type { Dispatch, SetStateAction } from 'react';

export type ResList = {
  info: {
    id: string;
    name: string;
    avgRatingString: string;
    sla: {
      slaString: string;
    };
    cuisines: string[];
    cloudinaryImageId: string;
    costForTwo:string;
    aggregatedDiscountInfoV3:{
      header:string;
      subHeader:string;
    }
  };
};


export type ItemList = {
  text: string;
  imageId: string;
  id:string;
  entityId:string;
};


 export interface User {
    name: string;
    [key: string]: any;
  }

  export type MenuItem = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  price: number;
  ratings?: {
    aggregatedRating?: {
      rating?: string;
      ratingCount?: string;
    };
  };
};

export type MenuQueryResult = {
  items: MenuItem[];
  title: string;
};


export type cartItem = Omit<MenuItem, "ratings" | "description">

export type InitialState=cartItem[] & {quantity:number}

export type SortConfig = {
  title: string;
};

export type FacetInfoItem = {
  label: string;
};

export type FaceList = {
   facetInfo:FacetInfoItem[]
}

export type FilteredLabel = {
  sortByData: SortConfig[];
  categoryFilter: FaceList[];
}

export type Category = {
  name: string;
  faqs: string[];
};

export interface FetchedData {
  restaurants: ResList[];
  title: string;
  filteredDataTitle: {
    sortByData: SortConfig[];
    categoryFilter: FaceList[];
  };
}


export type Suggestion ={
    text:string;
    type:string;
    cloudinaryId:string;
}

export type Dish = {
  card: {
    card: {
      info: {
        id: string;
        name: string;
        imageId: string;
        price: number;
      };
      restaurant:ResList;
    };
  };
};

export type Brands = {
   text:string;
   link:string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface LocationContextType {
  location: Location | null;
  setLocation: Dispatch<SetStateAction<Location | null>>;
  userAddress: string;
  setUserAddress: (address: string) => void;
  loading: boolean;
  error: string | null;
  handleLocationFetch: () => void;
}

export interface PlaceSuggestion {
  description: string;
  place_id: string;
}
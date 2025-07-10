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
  };
};


export type ItemList = {
  text: string;
  imageId: string;
  id:string;
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
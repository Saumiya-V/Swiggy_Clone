import App from '@/App'
import { NotFound } from '@/components/notfound/NotFound';
import SearchBar from '@/components/searchBar/SearchBar';
import Cart from '@/pages/cart/Cart';
import ExploreRestaurants from '@/pages/exploreRestaurants/ExploreRestaurants';
import Home from '@/pages/home/Home';
import Menu from '@/pages/menu/Menu';
import {createRootRoute, createRoute, createRouter} from '@tanstack/react-router'

const rootRoute = createRootRoute({
   component:App,
   notFoundComponent: NotFound
});

const homeRoute = createRoute({
    path:"/",
    getParentRoute:()=>rootRoute,
    component:()=><Home/>
})

const searchRoute = createRoute({
    path:"/search",
    getParentRoute:()=>rootRoute,
    component:()=><SearchBar/>,
})

const menuRoute = createRoute({
    path:"/menu/$id",
    getParentRoute:()=>rootRoute,
    component:Menu
})

const cartRoute = createRoute({
    path:"/cart",
    getParentRoute:()=>rootRoute,
    component:Cart
})

const exploreRestaurantsRoute = createRoute({
    path:"/itemBasedRestaurants/$id",
    getParentRoute:()=>rootRoute,
    component:ExploreRestaurants
})

const routeTree = rootRoute.addChildren([homeRoute,searchRoute,menuRoute,cartRoute,exploreRestaurantsRoute ])

export const router = createRouter({routeTree})
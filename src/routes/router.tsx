import App from '@/App'
import {LoginComponent} from '@/components/checkoutdetails/login/LoginComponent';
import { NotFound } from '@/components/notfound/NotFound';
import SearchBar from '@/components/searchBar/SearchBar';
import Cart from '@/pages/cart/Cart';
import ExploreRestaurants from '@/pages/exploreRestaurants/ExploreRestaurants';
import HelpSupportPage from '@/pages/help/HelpSupportPage';
import Home from '@/pages/home/Home';
import Menu from '@/pages/menu/Menu';
import PaymentPage from '@/pages/payment/Payment';
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
  path: "/itemBasedRestaurants/$collectionId",
  getParentRoute: () => rootRoute,
  component: ExploreRestaurants,
});

const helpRoute = createRoute({
    path:"/help",
    getParentRoute:()=>rootRoute,
    component:HelpSupportPage
})

const LoginRoute = createRoute({
    path:"/login",
    getParentRoute:()=>rootRoute,
    component:LoginComponent
})

const PaymentRoute = createRoute({
    path:"/payment",
    getParentRoute:()=>rootRoute,
    component:PaymentPage
})

const routeTree = rootRoute.addChildren([homeRoute,searchRoute,menuRoute,cartRoute,exploreRestaurantsRoute,helpRoute,LoginRoute,PaymentRoute ])

export const router = createRouter({routeTree})
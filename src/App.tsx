import { Outlet } from "@tanstack/react-router"
import Header from "./components/header/Header"



function App() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
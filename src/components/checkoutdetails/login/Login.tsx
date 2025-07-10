import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import LoginComponent from './LoginComponent'


const Login = () => {
  const [isDisplayLogin,setIsDisplayLogin] = useState(false)
  return (
    <div>
  <div className="flex flex-col md:flex-row items-center justify-between gap-10">
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-gray-600 mt-1">
          To place your order now, log in to your existing account or sign up.
        </p>
      </div>

      <div>
       {
        isDisplayLogin ? (<LoginComponent/>):( <Button onClick={()=>setIsDisplayLogin(true)} className="bg-green-600 text-white font-semibold  p-5 items-center rounded-sm hover:bg-green-700 cursor-pointer">
          <p>LOGIN / SIGN UP</p>
        </Button>)
       }
      </div>
    </div>
  </div>

    </div>
  )
}

export default Login
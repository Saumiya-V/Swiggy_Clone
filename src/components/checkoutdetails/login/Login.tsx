import {LoginComponent} from './LoginComponent'


const Login = () => {
 
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
       <LoginComponent/>
      </div>
    </div>
  </div>

    </div>
  )
}

export default Login
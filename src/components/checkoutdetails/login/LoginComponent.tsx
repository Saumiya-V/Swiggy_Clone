
import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';

const LoginComponent = () => {
     const [isLoginMode, setIsLoginMode] = useState(true);
      const [phone, setPhone] = useState("");
      const [otp, setOtp] = useState("");
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [showOtpField, setShowOtpField] = useState(false);
      
  const handleAuth = async () => {
    if (!showOtpField) {
      if (isLoginMode) {
        try {
          const res = await axios.post("http://localhost:4000/send-otp", { phone });
          if (res.data.success) setShowOtpField(true);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            alert(err.response?.data?.message || "Login failed");
          } else {
            alert("Login failed");
          }
        }
      } else {
        try {
          const res = await axios.post("http://localhost:4000/register", { name, email, phone });
          if (res.data.success) {
            alert("Registered! Now verify via OTP");
            setIsLoginMode(true);
            setShowOtpField(true);
            await axios.post("http://localhost:4000/send-otp", { phone });
            toast.success("OTP Sent")
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            alert(err.response?.data?.message || "Registration failed");
          } else {
            alert("Registration failed");
          }
        }
      }
    } else {
      try {
        const res = await axios.post("http://localhost:4000/verify-otp", { phone, otp });
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setPhone(""); setOtp(""); setEmail(""); setName("");
          setShowOtpField(false);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          alert(err.response?.data?.message || "OTP verification failed");
        } else {
          alert("OTP verification failed");
        }
      }
    }
  };

  return (
    <div>
        <div className="flex gap-10 mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {isLoginMode ? "Login" : "Sign Up"}
            </h2>
            <p>
              or{" "}
              <span
                className="text-orange-500 cursor-pointer font-semibold"
                onClick={() => {
                  setIsLoginMode((prev) => !prev);
                  setShowOtpField(false);
                }}
              >
                {isLoginMode ? "create an account" : "login to your account"}
              </span>
            </p>
          </div>
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
            alt="login"
            className="h-15 w-15"
          />
        </div>

        <div className="mx-auto flex flex-col mt-5 gap-2">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="border p-4 w-[250px]"
          />
          {showOtpField && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="border p-4 w-[250px]"
            />
          )}
          {!isLoginMode && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border p-4 w-[250px]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border p-4 w-[250px]"
              />
            </>
          )}
          <button
            onClick={handleAuth}
            className="bg-orange-500 text-white font-semibold mt-4 p-4 w-[250px]"
          >
            {showOtpField
              ? "Verify OTP"
              : isLoginMode
              ? "Login with OTP"
              : "Register"}
          </button>
          <p className="mt-2 text-sm w-[250px]">
            By continuing, you agree to our{" "}
            <span className="font-semibold">Terms & Conditions</span>
          </p>
        </div>
    </div>
  )
}

export default LoginComponent
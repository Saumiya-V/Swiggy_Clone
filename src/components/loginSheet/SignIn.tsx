import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import axios from "axios";
import type { User } from "@/types";


export function SignIn() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showSheet,setShowSheet] = useState(false)
  const [showLogoutDiv,setshowLogoutDiv] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

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
          setShowSheet(false)
          setCurrentUser(res.data.user);
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

 const handleLogout = () => {
  localStorage.removeItem("user");
  setCurrentUser(null);
  setshowLogoutDiv(false)
};


  return (
    currentUser?(<div className="relative">
      <Button className="bg-transparent p-0 m-0 text-[16px] text-black font-semibold shadow-none hover:bg-transparent cursor-pointer" onClick={()=>setshowLogoutDiv(prev=>!prev)}>{currentUser.name}</Button>
      {
        showLogoutDiv && <div className="absolute top-10 right-[-8px]">
          <Button className="bg-white px-7 text-black border-2 hover:bg-white text-black cursor-pointer" onClick={handleLogout}>Logout</Button>
        </div>
      }
    </div>):
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <div onClick={()=>setShowSheet(true)}>
          <Button  className="bg-transparent p-0 m-0 text-[16px] text-black font-semibold shadow-none hover:bg-transparent cursor-pointer">
            Sign In
          </Button>
        </div>
      </SheetTrigger>
      {
        showLogoutDiv?(
          <div className="">
            <button onClick={handleLogout}>Logout</button>
          </div>
        ):(<SheetContent className="z-[1000]">
        <div className="flex gap-10 mx-auto mt-30">
          <div>
            <h2 className="text-3xl font-semibold mb-3">
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
            className="h-25 w-25"
          />
        </div>

        <div className="mx-auto flex flex-col mt-5 gap-2">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="border p-4 w-[300px]"
          />
          {showOtpField && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="border p-4 w-[300px]"
            />
          )}
          {!isLoginMode && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border p-4 w-[300px]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border p-4 w-[300px]"
              />
            </>
          )}
          <button
            onClick={handleAuth}
            className="bg-orange-500 text-white font-semibold mt-4 p-4"
          >
            {showOtpField
              ? "Verify OTP"
              : isLoginMode
              ? "Login with OTP"
              : "Register"}
          </button>
          <p className="mt-2 text-sm w-[300px]">
            By continuing, you agree to our{" "}
            <span className="font-semibold">Terms & Conditions</span>
          </p>
        </div>
      </SheetContent>)
      }
    </Sheet>
  );
}

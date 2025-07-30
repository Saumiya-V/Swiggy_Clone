import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import {
  setFormField,
  toggleAuthMode,
  setUser,
  registerUser,
  sendOtp,
  verifyOtp,
  setError,
} from "../../redux/slice/authSlice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export function SignIn() {
  const [showSheet, setShowSheet] = useState(false);
  const [showLogoutDiv, setShowLogoutDiv] = useState(false);

  const dispatch = useAppDispatch();
  const {
    user,
    authMode,
    form: { phone, otp, name, email },
    showOtpField,
    loading,
    error
  } = useSelector((state: RootState) => state.auth);

  const handleAuth = () => {
    if (!showOtpField) {
      authMode === "login" ? dispatch(sendOtp()) : dispatch(registerUser());
    } else {
      dispatch(verifyOtp());
      setShowSheet(false);
    }
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    setShowLogoutDiv(false);
  };

  return user ? (
    <div className="relative">
      <Button
        className="bg-transparent p-0 m-0 text-[16px] text-black font-semibold shadow-none hover:bg-transparent cursor-pointer"
        onClick={() => setShowLogoutDiv((prev) => !prev)}
      >
        {user.name}
      </Button>
      {showLogoutDiv && (
        <div className="absolute top-10 right-[-8px]">
          <Button
            className="bg-white px-7 text-black border-2 hover:bg-white text-black cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  ) : (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <div onClick={() => setShowSheet(true)}>
          <Button className="bg-transparent p-0 m-0 text-[16px] text-black font-semibold shadow-none hover:bg-transparent cursor-pointer">
            Sign In
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="z-[1000]">
        <div className="flex gap-10 mx-auto mt-30">
          <div>
            <h2 className="text-3xl font-semibold mb-3">
              {authMode === "login" ? "Login" : "Sign Up"}
            </h2>
            <p>
              or{" "}
              <span
                className="text-orange-500 cursor-pointer font-semibold"
                onClick={() => dispatch(toggleAuthMode())}
              >
                {authMode === "login"
                  ? "create an account"
                  : "login to your account"}
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
            onChange={(e) => {
              dispatch(setFormField({ field: "phone", value: e.target.value }));
              if ((e.target.value).length < 10 ) {
                dispatch(setError('Please enter valid phone number'));
              } else {
                dispatch(setError(null));
              }
            }}
            placeholder="Phone Number"
            className="border p-4 w-[300px]"
          />
          {showOtpField && (
            <input
              type="text"
              value={otp}
              onChange={(e) =>
                dispatch(setFormField({ field: "otp", value: e.target.value }))
              }
              placeholder="OTP"
              className="border p-4 w-[300px]"
            />
          )}
          {authMode === "register" && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  dispatch(setFormField({ field: "name", value: e.target.value }))
                }
                placeholder="Name"
                className="border p-4 w-[300px]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) =>
                  dispatch(setFormField({ field: "email", value: e.target.value }))
                }
                placeholder="Email"
                className="border p-4 w-[300px]"
              />
            </>
          )}
          {error && authMode !== 'register' && <p className="text-red-500 mt-5">{error}</p>}
          <button
            onClick={handleAuth}
            className="bg-orange-500 text-white font-semibold mt-4 p-4"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : showOtpField
              ? "Verify OTP"
              : authMode === "login"
              ? "Login with OTP"
              : "Register"}
          </button>
          <p className="mt-2 text-sm w-[300px]">
            By continuing, you agree to our{" "}
            <span className="font-semibold">Terms & Conditions</span>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}


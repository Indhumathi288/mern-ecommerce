import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ closeModal }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRequestOtp = () => {
    if (mobile.length !== 10) return;
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) return;

    // mock login success
    localStorage.setItem("loggedIn", "true");
    setSuccess(true);

    // close modal after showing success message
    setTimeout(() => {
      closeModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[720px] flex rounded shadow-lg relative">

        {/* LEFT PANEL */}
        <div className="w-1/2 bg-blue-600 text-white p-8 hidden md:block">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <p className="text-sm">
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 p-8">

          {/* ✅ SUCCESS MESSAGE */}
          {success && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-green-600 text-lg font-semibold mb-2">
                ✅ Login Successful
              </div>
              <p className="text-sm text-gray-600">
                Redirecting...
              </p>
            </div>
          )}

          {/* STEP 1: MOBILE */}
          {!success && step === 1 && (
            <>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border-b p-2 mb-6 outline-none"
              />

              <button
                disabled={mobile.length !== 10}
                onClick={handleRequestOtp}
                className="w-full bg-orange-500 text-white py-2 rounded disabled:opacity-50"
              >
                Request OTP
              </button>
            </>
          )}

          {/* STEP 2: OTP */}
          {!success && step === 2 && (
            <>
              <p className="text-sm text-gray-600 mb-2">
                OTP sent to +91 {mobile}
              </p>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border-b p-2 mb-6 outline-none"
              />

              <button
                disabled={otp.length !== 6}
                onClick={handleVerifyOtp}
                className="w-full bg-orange-500 text-white py-2 rounded disabled:opacity-50"
              >
                Verify & Login
              </button>

              <button
                onClick={() => setStep(1)}
                className="text-sm text-blue-600 mt-4"
              >
                Change mobile number
              </button>
            </>
          )}

          {!success && (
            <p
              onClick={() => {
                closeModal();
                navigate("/signup");
              }}
              className="text-blue-600 text-sm cursor-pointer text-center mt-6"
            >
              New user? Create an account
            </p>
          )}
        </div>

        {/* CLOSE BUTTON */}
        {!success && (
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginModal;

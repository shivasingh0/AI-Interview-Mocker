"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

const Verifyemail = () => {
  const [token, setToken] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);

  const verifyUserEmail = async () => {
    const response = await axios.post("/api/users/verifyemail", { token, recaptchaToken });
    return response;
  };

  const onChange = (value) => {
    setRecaptchaToken(value);
    setRecaptchaCompleted(true);
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
    setLoading(false); // Set loading to false after token extraction
  }, []);

  const handleVerifyClick = () => {
    if (!recaptchaToken) {
      toast.error("Please complete the ReCAPTCHA");
      return;
    }
    setButtonClicked(true);
    setLoading(true);
    toast.promise(verifyUserEmail(), {
      loading: "Verifying...",
      success: (response) => {
        setVerified(true);
        setError(false);
        setLoading(false);
        return "Email verified successfully!";
      },
      error: (error) => {
        setError(true);
        setLoading(false);
        return "Failed to verify email. Please try again.";
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Verify Email</h1>
      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onChange} />
      {!buttonClicked ? (
        recaptchaCompleted && (
          <button
            onClick={handleVerifyClick}
            className="inline-block mt-5 rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Verify Email
          </button>
        )
      ) : (
        <>
          {loading ? (
            <p>Verifying...</p>
          ) : (
            <>
              {verified && (
                <div>
                  <h2 className="p-2 bg-green-500 text-center my-4 rounded-lg text-white">Verified</h2>
                  <Link href="/login" className="text-blue-500 text-center hover:underline">
                    Go to Login Page
                  </Link>
                </div>
              )}
              {error && (
                <div>
                  <h2 className="p-2 bg-red-500 text-white">Error</h2>
                  <p>Something went wrong. Please try again later.</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Verifyemail;

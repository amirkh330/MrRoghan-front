import useAuthStore from "@/store/authStore";
import { emailRegex } from "@/utils/Regex/Regex";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useLogin = (onClose: () => void) => {
  const toast = useToast();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [serverOtpKey, setServerOtpKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const { loginUser } = useAuthStore();

  const handleSendOtp = async () => {
    // setLoading(true);
    // handleLogin();
    setStep("otp");
    // axios
    //   .post(
    //     `${
    //       import.meta.env.VITE_APP_BASE_URL
    //     }authorization/login-whit-otp/create-otp/`,
    //     {
    //       email,
    //     }
    //   )
    //   .then(({ data }) => {
    //     setServerOtpKey(data);
    //     // handleLogin();
    //     setStep("otp");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const handleSetPhoneNumber = () => {
    handleSendOtp();
  };

  const handleReset = () => {
    setErrorMessage("");
    setEmail("");
    setStep("email");
    setOtp("");
  };
  const handleVerifyOtp = async () => {
    // if("user" == "customer"){
    navigate("/home");
    // }

    // setLoading(true);

    // axios
    //   .post(
    //     `${
    //       import.meta.env.VITE_APP_BASE_URL
    //     }authorization/login-whit-otp/validate-otp/`,
    //     {
    //       code: otp,
    //       email,
    //     }
    //   )
    //   .then(({ data }) => {
    //     toast({
    //       title: "Welcome dear",
    //       description: "Login successfully",
    //       status: "success",
    //       position: "top",
    //     });
    //     loginUser({ access: data.access, refresh: data.refresh });
    //     onClose();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return {
    otp,
    step,
    email,
    setOtp,
    loading,
    setEmail,
    setLoading,
    handleReset,
    errorMessage,
    handleVerifyOtp,
    setErrorMessage,
    handleSetPhoneNumber,
  };
};

import { persianToEnglishNumbers } from "@/utils/convertNumber/ConvertNumber";
import {
  Box,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const OtpStep = ({ otp, setOtp, handleSendOtp, loading }: any) => {
  useEffect(() => {
    otp.length === 4 && handleSendOtp();
  }, [otp]);

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        } as any)
        .then((otp: any) => {
          if (otp?.code) {
            setOtp(otp.code);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return () => ac.abort();
    }
  }, []);

  return (
    <Box mx="auto" p="4">
      <Text color={"amir.common"}>لطفا کد otp را وارد کنید</Text>
      <HStack my="6" justifyContent={"space-around"} mx="8" dir="ltr">
        <PinInput
          otp
          value={otp}
          onChange={(e) => setOtp(persianToEnglishNumbers(e))}
        >
          <PinInputField
            _focusVisible={{ borderColor: "amir.primary" }}
            color={"amir.common"}
          />
          <PinInputField
            _focusVisible={{ borderColor: "amir.primary" }}
            color={"amir.common"}
          />
          <PinInputField
            _focusVisible={{ borderColor: "amir.primary" }}
            color={"amir.common"}
          />
          <PinInputField
            _focusVisible={{ borderColor: "amir.primary" }}
            color={"amir.common"}
          />
        </PinInput>
      </HStack>
      <Button
        my="2"
        isDisabled={otp.length !== 4}
        isLoading={loading}
        bg={"amir.primary"}
        color={"white"}
        w={"100%"}
        onClick={handleSendOtp}
      >
        ورود
      </Button>
    </Box>
  );
};

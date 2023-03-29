import React, {useState} from 'react';
import OTPInput, { ResendOTP } from "otp-input-react";

function Password() {
  const [OTP, setOTP] = useState("");
  return (
    <div>

        <OTPInput
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={4}
        otpType="number"
        disabled={false}
        secure
        />
        <ResendOTP handelResendClick={() => console.log("Resend clicked")} />
      </div>
  );
}
export default Password
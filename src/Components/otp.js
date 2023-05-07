import { useState, useEffect, useRef } from "react";

function OtpInput() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").split("");
    let newOtp = [...otp];
    for (let i = 0; i < pasteData.length && i < 4; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit ? "●" : ""}
          onChange={(e) => handleChange(e, index)}
          onPaste={handlePaste}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="otp__"
          style={{
            width: "40px",
            margin: "6px",
            height: "40px",
            textAlign: "center",
          }}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}

export default OtpInput;


import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export function VerifyOtp() {

 // const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate()
  const mobile = localStorage.getItem("mobile");

  const handleChange = (element, index) => {

    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;

    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const verifyOtp = async () => {

    const otpValue = otp.join("");

    try {

      await api.post("/auth/verify-otp", {
        mobileNumber: mobile,
        otp: otpValue
      });

        // ✅ token + role save kiya
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("OTP Verified Successfully");

       // ✅ role ke hisab se redirect
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {

      alert("Invalid OTP");

    }

  };

  return (
    
    <>

    <Container className="mt-5">

      <Card style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>

        <h3 className="text-center mb-3">Verify OTP</h3>

        {/* ❌ Mobile input hata diya */}
        <p className="text-center">
          OTP sent to: <b>{mobile}</b>
        </p>

        {/* OTP Boxes */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              style={{
                width: "45px",
                height: "45px",
                textAlign: "center",
                fontSize: "20px",
                border: "1px solid gray",
                borderRadius: "5px"
              }}
            />
          ))}

        </div>

        <Button
          variant="success"
          className="w-100 mt-3"
          onClick={verifyOtp}
        >
          Verify OTP
        </Button>

      </Card>

    </Container>
    
    </>

  );
}


import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

export default function ForgotPassword() {

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // step control

  const sendOtp = () => {
    alert("OTP Sent to " + mobile);
    setStep(2);
  };

  const resetPassword = () => {
    alert("Password Reset Successfully");
  };

  return (

    <Container className="mt-5">

      <Card style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>

        <h3 className="text-center">Forgot Password</h3>

        <Form>

          {/* Step 1 */}
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter mobile number"
                />
              </Form.Group>

              <Button variant="warning" className="w-100" onClick={sendOtp}>
                Send OTP
              </Button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </Form.Group>

              <Button variant="success" className="w-100" onClick={resetPassword}>
                Reset Password
              </Button>
            </>
          )}

        </Form>

      </Card>

    </Container>
  );
}
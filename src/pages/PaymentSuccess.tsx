import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {

  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("Verifying payment...");
  const [ticketUrl, setTicketUrl] = useState("");

  useEffect(() => {

    const verifyPayment = async () => {

      try {

        const res = await fetch("http://localhost:5000/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ reference })
        });

        const data = await res.json();

        if (data.status === "success") {

          setStatus("Payment successful! Your conference ticket is ready.");

          setTicketUrl(`http://localhost:5000/ticket/${data.participantId}`);

        } else {

          setStatus("Payment verification failed.");

        }

      } catch (error) {

        setStatus("Error verifying payment.");

      }

    };

    if (reference) verifyPayment();

  }, [reference]);

  return (
    <div className="payment-success-page">

      <div className="payment-success-card">

        <h1>Payment Confirmation</h1>

        <p>{status}</p>

        {ticketUrl && (

          <a
            href={ticketUrl}
            className="home-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Conference Ticket
          </a>

        )}

        <br /><br />

        <a href="/" className="home-btn">
          Return to Homepage
        </a>

      </div>

    </div>
  );

};

export default PaymentSuccess;
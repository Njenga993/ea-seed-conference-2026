import "../styles/InitializePayment.css";

const InitializePayment = () => {

  return (
    <div className="payment-init-page">

      <div className="payment-init-card">

        <h2>Preparing Secure Payment</h2>

        <p>Please wait while we connect to Paystack...</p>

        <div className="loader"></div>

      </div>

    </div>
  );
};

export default InitializePayment;
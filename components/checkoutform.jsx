"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
  const [spinner, setSpinner] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setSpinner(true);
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    console.log("Clicked", stripe, elements);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.href}?redirect_status=success`,
      },
      redirect: "if_required"
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      console.log("Payment Succesful!");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    setSpinner(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || spinner}
        className={`${
          spinner ? "bg-default" : "bg-primary"
        } text-white px-3 py-2 rounded-xl mt-5 w-full`}
      >
        {spinner ? "Processing..." : "Payment"}
      </button>
    </form>
  );
};

export default CheckoutForm;

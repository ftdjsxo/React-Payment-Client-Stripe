// src/App.js

import React from 'react';
import './App.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe("pk_test_51MeJeHLWr4akRVjCOgTlel3j2m28SLw3c5ge7CMVF0UflYfZWbyqXwIFKEDUtcUIxxceHOwpgfb9UDbuT6tOorK900U2jAismg");

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default App;

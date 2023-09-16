// src/PaymentForm.js

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [productName, setProductName] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert("Si è verificato un errore durante la creazione del metodo di pagamento.");
    } else {
      // Invia l'ID del metodo di pagamento al tuo server Flask
      const response = await fetch("http://127.0.0.1:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: amount,
          productName: productName
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert("Pagamento effettuato con successo!");
      } else {
        alert("Si è verificato un errore durante il pagamento: " + responseData.message);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nome Prodotto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Importo"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <CardElement />
      <button onClick={handlePayment}>Paga</button>
    </div>
  );
}

export default PaymentForm;

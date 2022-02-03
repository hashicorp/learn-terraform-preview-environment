import React from "react";
import PaymentForm from '../../components/PaymentForm'

export default function Payment() {

    return (
        <PaymentForm
          dropdownDefault="Card Type"
        />
    );
  }

//'{"name": "Gerry", "type": "mastercard", "number": "1234-1234-1234-1234", "expiry": "01/23", "cvc": "123"}' localhost:8080  | jq
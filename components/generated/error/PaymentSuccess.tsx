import React from 'react';
import Link from 'next/link';

export default function PaymentSuccess(props: any) {
  return (
    <>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Result</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }

        .success {
            color: #4CAF50;
        }

        .error {
            color: #F44336;
        }

        .message {
            margin-top: 50px;
            font-size: 24px;
        }

        .icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div className="icon success">&#10004;</div>
    <div className="message success">
        <p>Payment Successful</p>
        <p>Thank you for your payment. Your transaction has been completed.</p>
    </div>
</body>
</html>

    </>
  );
}

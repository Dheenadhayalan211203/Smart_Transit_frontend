import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Verify = () => {
  const [hashedId, setHashedId] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    const onSuccess = (result) => {
      scanner.clear();
      setHashedId(result);
      sendToApi(result);
    };

    const onError = (err) => {
      console.warn(err);
    };

    scanner.render(onSuccess, onError);
  }, []);

  const sendToApi = async (hashedId) => {
    try {
      const response = await fetch('http://smart-india.onrender.com/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hashedId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error sending scan result to API:', error);
    }
  };

  const getStatusMessage = () => {
    if (!apiResponse) return null;

    const statusMessages = {
      "Passenger Boarded": "Passenger has been successfully boarded.",
      "Travel completed": "Travel has been completed.",
      "Not Ticket": "The QR code does not match any ticket.",
      "Ticket already used": "The ticket has already been used.",
    };

    return statusMessages[apiResponse] || "Unknown response from server.";
  };

  return (
    <div>
      {hashedId ? (
        <div>
          <div>Status: {getStatusMessage()}</div>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
};

export default Verify;

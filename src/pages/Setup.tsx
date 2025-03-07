import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

function Setup() {
  const { connected } = useWallet();
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [connected]);

  return (
    <div>
      <Header />

      {connected && (
        <div className="mt-8">
          {showText ? (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-lg">Welcome, Smart Grid Member!</p>
              <div className="text-justify">
                <p><span className="text-yellow-500">You belong to:</span> Schneider Electric South Indian Microgrid</p>
                <p><span className="text-yellow-500">Your id:</span> Prosumer 28</p>
                <p><span className="text-yellow-500">Your maximum power capacity:</span> 40 kWh</p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue
              </button>
            </div>
          ) : (
            <p className="text-center animate-pulse">Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Setup;

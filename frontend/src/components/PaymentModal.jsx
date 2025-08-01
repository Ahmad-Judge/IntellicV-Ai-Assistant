// PaymentModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Lock, Download, CreditCard, Check, Loader } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onSuccess, user }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Lemon Squeezy configuration
  const LEMON_SQUEEZY_STORE_ID = process.env.REACT_APP_LEMON_SQUEEZY_STORE_ID;
  const LEMON_SQUEEZY_PRODUCT_ID = process.env.REACT_APP_LEMON_SQUEEZY_PRODUCT_ID;

  useEffect(() => {
    if (isOpen) {
      // Load Lemon Squeezy script when modal opens
      const script = document.createElement('script');
      script.src = 'https://assets.lemonsqueezy.com/lemon-js/lemon.js';
      script.async = true;
      script.onload = () => {
        if (window.LemonSqueezy) {
          window.LemonSqueezy.Setup({
            eventHandler: handleLemonSqueezyEvent
          });
        }
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [isOpen]);

  const handleLemonSqueezyEvent = (event) => {
    console.log('Lemon Squeezy Event:', event);
    
    switch (event.event) {
      case 'Checkout.Success':
        handlePaymentSuccess(event.data);
        break;
      case 'Checkout.Close':
        setIsProcessing(false);
        break;
      case 'Checkout.Error':
        setError('Payment failed. Please try again.');
        setIsProcessing(false);
        break;
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    setIsProcessing(false);
    onSuccess(paymentData);
  };

  const initiatePayment = async () => {
    if (!user) {
      setError('Please log in to continue.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Create checkout session
      const response = await fetch('/api/payment/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          name: user.name || user.email,
          productId: LEMON_SQUEEZY_PRODUCT_ID,
          storeId: LEMON_SQUEEZY_STORE_ID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { checkoutUrl } = await response.json();

      // Open Lemon Squeezy checkout
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Url.Open(checkoutUrl);
      } else {
        // Fallback: open in new window
        window.open(checkoutUrl, '_blank', 'width=800,height=600');
      }

    } catch (error) {
      console.error('Payment initiation error:', error);
      setError('Failed to start payment process. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Unlock Downloads</h2>
          </div>
          
          <p className="text-white/90 text-sm">
            Get unlimited PDF downloads for life
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Unlimited PDF downloads
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                All resume templates included
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Lifetime access - pay once, use forever
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                Secure payment with Lemon Squeezy
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              $4.99
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              One-time payment • Lifetime access
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={initiatePayment}
              disabled={isProcessing}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Get Unlimited Downloads
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={isProcessing}
              className="w-full py-3 px-6 rounded-xl font-medium text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              🔒 Secure payment powered by Lemon Squeezy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
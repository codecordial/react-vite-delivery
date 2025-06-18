import React, { useState } from 'react';
import { QrCode, Search, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import Modal from '../components/Modal';

interface ProductVerificationSectionProps {
  onShowToast: (message: string) => void;
}

const ProductVerificationSection: React.FC<ProductVerificationSectionProps> = ({ onShowToast }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    productDetails?: {
      name: string;
      model: string;
      manufacturingDate: string;
      warranty: string;
    };
  } | null>(null);

  const handleVerification = () => {
    // This is a mock verification. Will be replaced with actual API call
    if (verificationCode.trim()) {
      // Simulating API response
      setVerificationResult({
        isValid: true,
        productDetails: {
          name: "HATIL Dining Table",
          model: "DT-2024",
          manufacturingDate: "March 2024",
          warranty: "5 Years"
        }
      });
      onShowToast('Product verified successfully!');
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    // QR scanning logic will be implemented later
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Product Verification</h1>
          <p className="mt-2 text-gray-600">Verify your HATIL product authenticity using verification code or QR code</p>
        </div>

        {/* Verification Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Manual Verification */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Manual Verification</h2>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleVerification}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Verify Product
              </button>
            </div>
          </div>

          {/* QR Code Verification */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">QR Code Verification</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <QrCode className="h-24 w-24 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Scan the QR code on your product</p>
              </div>
              <button
                onClick={handleScan}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Scan QR Code
              </button>
            </div>
          </div>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              {verificationResult.isValid ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
              <h2 className="text-lg font-semibold text-gray-900">
                {verificationResult.isValid ? 'Product Verified' : 'Invalid Product'}
              </h2>
            </div>

            {verificationResult.isValid && verificationResult.productDetails && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Product Name</p>
                    <p className="font-medium text-gray-900">{verificationResult.productDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Model</p>
                    <p className="font-medium text-gray-900">{verificationResult.productDetails.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Manufacturing Date</p>
                    <p className="font-medium text-gray-900">{verificationResult.productDetails.manufacturingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Warranty</p>
                    <p className="font-medium text-gray-900">{verificationResult.productDetails.warranty}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* QR Scanner Modal */}
        <Modal
          isOpen={isScanning}
          onClose={() => setIsScanning(false)}
          title="Scan QR Code"
        >
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <QrCode className="h-32 w-32 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Position the QR code within the frame</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsScanning(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductVerificationSection; 
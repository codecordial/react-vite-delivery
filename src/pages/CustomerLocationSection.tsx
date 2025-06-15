import React from 'react';
import { ArrowLeft, MapPin, Phone, User } from 'lucide-react';
import { Order } from '../types/Order';

interface CustomerLocationSectionProps {
  order: Order | null;
  onBack: () => void;
}

const CustomerLocationSection: React.FC<CustomerLocationSectionProps> = ({ order, onBack }) => {
  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Customer information not found</p>
        <button
          onClick={onBack}
          className="mt-4 text-red-600 hover:text-red-700 flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Customer Location</h1>
        <p className="text-gray-600">View customer details and location</p>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500 text-lg font-medium">Map goes here</p>
          <p className="text-gray-400 text-sm mt-2">Interactive map will be integrated</p>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User size={20} />
          Customer Information
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <User className="text-gray-400 mt-1" size={16} />
            <div>
              <p className="text-sm text-gray-600">Customer Name</p>
              <p className="font-medium text-gray-900">{order.customerName}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="text-gray-400 mt-1" size={16} />
            <div>
              <p className="text-sm text-gray-600">Customer Address</p>
              <p className="font-medium text-gray-900">{order.customerAddress}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="text-gray-400 mt-1" size={16} />
            <div>
              <p className="text-sm text-gray-600">Customer Phone</p>
              <p className="font-medium text-gray-900">{order.customerPhone}</p>
              <a 
                href={`tel:${order.customerPhone}`}
                className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center gap-1 mt-1"
              >
                <Phone size={14} />
                Call Customer
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">
              <strong>Bill No:</strong> {order.billNo}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Order No:</strong> {order.orderNo}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">
              <strong>Billing Date:</strong> {order.billingDate}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Status:</strong> <span className="font-medium">{order.status}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLocationSection;
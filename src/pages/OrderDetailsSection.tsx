import React, { useState } from 'react';
import { ArrowLeft, Package, MessageSquare } from 'lucide-react';
import { Order, OrderItem } from '../types/Order';
import Modal from '../components/Modal';

interface OrderDetailsSectionProps {
  order: Order | null;
  onBack: () => void;
  isCustomerView?: boolean;
}

const OrderDetailsSection: React.FC<OrderDetailsSectionProps> = ({ order, onBack, isCustomerView = false }) => {
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [ratings, setRatings] = useState({
    installation: 5,
    salesPerson: 5,
    showroom: 5,
    delivery: 5
  });

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Order not found</p>
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

  const mockOrderItems: OrderItem[] = [
    {
      name: "Wooden Dining Table",
      quantity: 1,
      price: 25000,
      color: "Natural Oak",
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Modern Sofa Set",
      quantity: 1,
      price: 75000,
      color: "Grey Fabric",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Delivered':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Partial Fitting':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleSubmitFeedback = () => {
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { ratings, feedback });
    setFeedbackModal(false);
    setFeedback('');
    setRatings({
      installation: 5,
      salesPerson: 5,
      showroom: 5,
      delivery: 5
    });
  };

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const renderRatingQuestion = (
    category: keyof typeof ratings,
    questionEn: string,
    questionBn: string
  ) => (
    <div className="space-y-2">
      <p className="font-medium text-gray-900">{questionEn}</p>
      <p className="text-gray-600 text-sm">{questionBn}</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(category, star)}
            className={`text-2xl ${
              star <= ratings[category] ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        {isCustomerView && (
          <button
            onClick={() => setFeedbackModal(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <MessageSquare size={20} />
            Give Feedback
          </button>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Details - {order.billNo}
        </h1>
      </div>

      {/* Order Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Bill No:</strong> {order.billNo}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Order No:</strong> {order.orderNo}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Billing Date:</strong> {order.billingDate}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Customer Name:</strong> {order.customerName}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Customer Address:</strong> {order.customerAddress}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Customer Phone:</strong> {order.customerPhone}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="text-red-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
        </div>

        {mockOrderItems.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> BDT {item.price.toLocaleString()}</p>
                <p><strong>Color:</strong> {item.color}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status */}
      <div className={`rounded-lg p-4 border-l-4 ${getStatusColor(order.status)}`}>
        <p className="text-sm font-semibold mb-1">
          <strong>Status:</strong> {order.status}
        </p>
        {order.statusDate && (
          <p className="text-sm">{order.statusDate}</p>
        )}
      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={feedbackModal}
        onClose={() => setFeedbackModal(false)}
        title="Give Your Feedback"
      >
        <div className="space-y-6">
          {renderRatingQuestion(
            'installation',
            'How satisfied are you with our installation service?',
            'আমাদের ইন্সটলেশন সার্ভিসটি আপনার কেমন লেগেছে?'
          )}

          {renderRatingQuestion(
            'salesPerson',
            'Was Our sales person capable enough to demonstrate our product and service information?',
            'বিক্রয় কর্মী যথাযত ভাবে আমাদের পণ্য ও সার্ভিস সম্পর্কিত তথ্য দিতে পেরেছিল?'
          )}

          {renderRatingQuestion(
            'showroom',
            'Share your feeling about showroom display and overall interior?',
            'শো রুম এর ডিসপ্লে ও ইন্টেরিওরের ক্ষেত্রে আপনার মতামত কি?'
          )}

          {renderRatingQuestion(
            'delivery',
            'Was the product delivered timely?',
            'ফার্নিচার কি সময়মত ডেলিভারি হয়েছিলো?'
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Any Comment/Feedback?
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={4}
              placeholder="Share your additional comments or feedback..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setFeedbackModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitFeedback}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetailsSection;
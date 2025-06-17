import React from 'react';
import { Order } from '../types/Order';

interface OrderCardProps {
  order: Order;
  onOrderClick: (billNo: string) => void;
  actions?: React.ReactNode;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onOrderClick, actions }) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Processing':
        return { text: 'Picked', color: 'bg-blue-100 text-blue-800' };
      case 'Pending':
        return { text: 'Way to Deliver', color: 'bg-yellow-100 text-yellow-800' };
      case 'Completed':
        return { text: 'Completed', color: 'bg-green-100 text-green-800' };
      case 'Cancelled':
        return { text: 'Cancelled', color: 'bg-red-100 text-red-800' };
      default:
        return null;
    }
  };

  const statusLabel = getStatusLabel(order.status);
  const isCompleted = order.status === 'Completed';

  return (
    <div className={`
      bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow
      ${isCompleted ? 'bg-green-50 border-l-4 border-l-green-500' : ''}
    `}>
      <div className="flex justify-between items-start mb-3">
        <h3 
          className="text-lg font-semibold text-red-600 cursor-pointer hover:underline"
          onClick={() => onOrderClick(order.billNo)}
        >
          Bill No: {order.billNo}
        </h3>
        {statusLabel && (
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusLabel.color}`}>
            {statusLabel.text}
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <p><span className="font-medium">Order No:</span> {order.orderNo}</p>
        <p><span className="font-medium">Order Date:</span> {order.orderDate}</p>
        <p><span className="font-medium">Customer Name:</span> {order.customerName}</p>
        <p><span className="font-medium">Customer Address:</span> {order.customerAddress}</p>
        <p><span className="font-medium">Customer Phone:</span> {order.customerPhone}</p>
        {order.statusDate && (
          <p className="text-green-600 font-semibold">{order.statusDate}</p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
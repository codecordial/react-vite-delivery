import React, { useState, useMemo } from 'react';
import { mockOrders } from '../data/mockData';
import { Order } from '../types/Order';
import TabBar from '../components/TabBar';
import SearchBar from '../components/SearchBar';
import OrderCard from '../components/OrderCard';
import Modal from '../components/Modal';

interface DeliverySectionProps {
  onOrderClick: (billNo: string) => void;
  onCustomerLocationClick: (billNo: string) => void;
  onShowToast: (message: string) => void;
  orders: Record<string, Order>;
  onUpdateOrders: (orders: Record<string, Order>) => void;
}

const DeliverySection: React.FC<DeliverySectionProps> = ({ 
  onOrderClick, 
  onCustomerLocationClick, 
  onShowToast,
  orders,
  onUpdateOrders
}) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null
  });
  const [endDeliveryModal, setEndDeliveryModal] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null
  });

  const ordersList = Object.values(orders);

  const filteredOrders = useMemo(() => {
    let statusFiltered: Order[] = [];
    
    // Filter for delivery orders only
    const deliveryOrders = ordersList.filter(order => order.type === 'Delivery');
    
    switch (activeTab) {
      case 'pending':
        statusFiltered = deliveryOrders.filter(order => order.status === 'Pending');
        break;
      case 'processing':
        statusFiltered = deliveryOrders.filter(order => order.status === 'Processing');
        break;
      case 'completed':
        statusFiltered = deliveryOrders.filter(order => order.status === 'Completed');
        break;
      default:
        statusFiltered = deliveryOrders;
    }

    if (!searchQuery) return statusFiltered;

    return statusFiltered.filter(order => 
      order.billNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [ordersList, activeTab, searchQuery]);

  const tabs = [
    { 
      id: 'pending', 
      label: 'Pending', 
      count: ordersList.filter(o => o.type === 'Delivery' && o.status === 'Pending').length 
    },
    { 
      id: 'processing', 
      label: 'Processing', 
      count: ordersList.filter(o => o.type === 'Delivery' && o.status === 'Processing').length 
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      count: ordersList.filter(o => o.type === 'Delivery' && o.status === 'Completed').length 
    }
  ];

  const handleStartDelivery = (billNo: string) => {
    setConfirmModal({ isOpen: true, orderId: billNo });
  };

  const confirmStartDelivery = () => {
    if (confirmModal.orderId) {
      const newOrders = { ...orders };
      newOrders[confirmModal.orderId].status = 'Processing';
      onUpdateOrders(newOrders);
      onShowToast('Delivery started successfully!');
      setActiveTab('processing');
    }
    setConfirmModal({ isOpen: false, orderId: null });
  };

  const handleEndDelivery = (billNo: string) => {
    setEndDeliveryModal({ isOpen: true, orderId: billNo });
  };

  const confirmEndDelivery = () => {
    if (endDeliveryModal.orderId) {
      const newOrders = { ...orders };
      const currentTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' });
      newOrders[endDeliveryModal.orderId].status = 'Completed';
      newOrders[endDeliveryModal.orderId].statusDate = `Completed: ${currentTime}`;
      onUpdateOrders(newOrders);
      onShowToast('Delivery completed successfully!');
      setActiveTab('completed');
    }
    setEndDeliveryModal({ isOpen: false, orderId: null });
  };

  const renderOrderActions = (order: Order) => {
    if (order.status === 'Pending') {
      return (
        <button
          onClick={() => handleStartDelivery(order.billNo)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Start Delivery
        </button>
      );
    }

    if (order.status === 'Processing') {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleEndDelivery(order.billNo)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            End Delivery
          </button>
          <button
            onClick={() => onCustomerLocationClick(order.billNo)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            See Customer
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Delivery</h1>
        <p className="text-gray-600">Manage your delivery assignments</p>
      </div>

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery}
        placeholder="Search deliveries..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.billNo}
            order={order}
            onOrderClick={onOrderClick}
            actions={renderOrderActions(order)}
          />
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No deliveries found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
        </div>
      )}

      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, orderId: null })}
        title="Start This Delivery?"
      >
        <p className="text-gray-600 mb-6">
          If you want to proceed, click Yes, or No to cancel.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setConfirmModal({ isOpen: false, orderId: null })}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            No
          </button>
          <button
            onClick={confirmStartDelivery}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Yes
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={endDeliveryModal.isOpen}
        onClose={() => setEndDeliveryModal({ isOpen: false, orderId: null })}
        title="Delivery Completed?"
      >
        <p className="text-gray-600 mb-6">
          If you want to proceed, click Yes, or No to cancel.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setEndDeliveryModal({ isOpen: false, orderId: null })}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            No
          </button>
          <button
            onClick={confirmEndDelivery}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeliverySection;
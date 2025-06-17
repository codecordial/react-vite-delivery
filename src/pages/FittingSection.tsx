import React, { useState, useMemo } from 'react';
import { mockOrders } from '../data/mockData';
import { Order } from '../types/Order';
import TabBar from '../components/TabBar';
import SearchBar from '../components/SearchBar';
import OrderCard from '../components/OrderCard';
import Modal from '../components/Modal';

interface FittingSectionProps {
  onOrderClick: (billNo: string) => void;
  onShowToast: (message: string) => void;
  orders: Record<string, Order>;
  onUpdateOrders: (orders: Record<string, Order>) => void;
}

const FittingSection: React.FC<FittingSectionProps> = ({ 
  onOrderClick, 
  onShowToast,
  orders,
  onUpdateOrders
}) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [pauseModal, setPauseModal] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null
  });
  const [cancelModal, setCancelModal] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null
  });
  const [endFittingModal, setEndFittingModal] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null
  });
  const [pauseReason, setPauseReason] = useState('');
  const [pauseDate, setPauseDate] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [cancelDate, setCancelDate] = useState('');

  const ordersList = Object.values(orders);

  const filteredOrders = useMemo(() => {
    let statusFiltered: Order[] = [];
    
    switch (activeTab) {
      case 'pending':
        statusFiltered = ordersList.filter(order => order.status === 'Pending');
        break;
      case 'processing':
        statusFiltered = ordersList.filter(order => order.status === 'Processing');
        break;
      case 'partial':
        statusFiltered = ordersList.filter(order => order.status === 'Partial Fitting');
        break;
      case 'completed':
        statusFiltered = ordersList.filter(order => order.status === 'Completed');
        break;
      default:
        statusFiltered = ordersList;
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
      count: ordersList.filter(o => o.status === 'Pending').length 
    },
    { 
      id: 'processing', 
      label: 'Processing', 
      count: ordersList.filter(o => o.status === 'Processing').length 
    },
    { 
      id: 'partial', 
      label: 'Partial Fitting', 
      count: ordersList.filter(o => o.status === 'Partial Fitting').length 
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      count: ordersList.filter(o => o.status === 'Completed').length 
    }
  ];

  const handleStartFitting = (billNo: string) => {
    const newOrders = { ...orders };
    newOrders[billNo].status = 'Processing';
    onUpdateOrders(newOrders);
    onShowToast('Fitting started successfully!');
    setActiveTab('processing');
  };

  const handlePauseFitting = (billNo: string) => {
    if (!pauseReason || !pauseDate) {
      alert('Please provide a reason and a reschedule date.');
      return;
    }

    const newOrders = { ...orders };
    newOrders[billNo].status = 'Partial Fitting';
    newOrders[billNo].statusDate = `Paused - ${pauseReason}`;
    onUpdateOrders(newOrders);
    onShowToast('Fitting paused successfully!');
    setPauseModal({ isOpen: false, orderId: null });
    setPauseReason('');
    setPauseDate('');
    setActiveTab('partial');
  };

  const handleCancelFitting = (billNo: string) => {
    if (!cancelReason || !cancelDate) {
      alert('Please provide a reason and a reschedule date.');
      return;
    }

    const newOrders = { ...orders };
    newOrders[billNo].status = 'Pending';
    delete newOrders[billNo].statusDate;
    onUpdateOrders(newOrders);
    onShowToast('Fitting canceled and rescheduled!');
    setCancelModal({ isOpen: false, orderId: null });
    setCancelReason('');
    setCancelDate('');
    setActiveTab('pending');
  };

  const handleResumeFitting = (billNo: string) => {
    const newOrders = { ...orders };
    newOrders[billNo].status = 'Processing';
    delete newOrders[billNo].statusDate;
    onUpdateOrders(newOrders);
    onShowToast('Fitting resumed successfully!');
    setActiveTab('processing');
  };

  const handleEndFitting = (billNo: string) => {
    setEndFittingModal({ isOpen: true, orderId: billNo });
  };

  const confirmEndFitting = () => {
    if (endFittingModal.orderId) {
      const newOrders = { ...orders };
      const currentTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' });
      newOrders[endFittingModal.orderId].status = 'Completed';
      newOrders[endFittingModal.orderId].statusDate = `Completed: ${currentTime}`;
      onUpdateOrders(newOrders);
      onShowToast('Fitting completed successfully!');
      setActiveTab('completed');
    }
    setEndFittingModal({ isOpen: false, orderId: null });
  };

  const renderOrderActions = (order: Order) => {
    if (order.status === 'Pending') {
      return (
        <button
          onClick={() => handleStartFitting(order.billNo)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Start Fitting
        </button>
      );
    }

    if (order.status === 'Processing') {
      return (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPauseModal({ isOpen: true, orderId: order.billNo })}
            className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
          >
            Pause
          </button>
          <button
            onClick={() => setCancelModal({ isOpen: true, orderId: order.billNo })}
            className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => handleEndFitting(order.billNo)}
            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            End Fitting
          </button>
        </div>
      );
    }

    if (order.status === 'Partial Fitting') {
      return (
        <button
          onClick={() => handleResumeFitting(order.billNo)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          Resume Fitting
        </button>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Fitting</h1>
        <p className="text-gray-600">Manage your fitting assignments</p>
      </div>

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery}
        placeholder="Search fittings..."
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
          <p className="text-gray-500 text-lg">No fittings found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Pause Modal */}
      <Modal
        isOpen={pauseModal.isOpen}
        onClose={() => setPauseModal({ isOpen: false, orderId: null })}
        title="Pause Fitting"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please write the reason:
            </label>
            <textarea
              value={pauseReason}
              onChange={(e) => setPauseReason(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={3}
              placeholder="Enter reason for pausing..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reschedule Date (Optional):
            </label>
            <input
              type="date"
              value={pauseDate}
              onChange={(e) => setPauseDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => setPauseModal({ isOpen: false, orderId: null })}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => pauseModal.orderId && handlePauseFitting(pauseModal.orderId)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>

      {/* Cancel Modal */}
      <Modal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, orderId: null })}
        title="Cancel Fitting"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please write the reason:
            </label>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              rows={3}
              placeholder="Enter reason for canceling..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reschedule Date (Optional):
            </label>
            <input
              type="date"
              value={cancelDate}
              onChange={(e) => setCancelDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => setCancelModal({ isOpen: false, orderId: null })}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => cancelModal.orderId && handleCancelFitting(cancelModal.orderId)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>

      {/* End Fitting Confirmation Modal */}
      <Modal
        isOpen={endFittingModal.isOpen}
        onClose={() => setEndFittingModal({ isOpen: false, orderId: null })}
        title="Fitting Completed?"
      >
        <p className="text-gray-600 mb-6">
          If you want to proceed, click Yes, or No to cancel.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setEndFittingModal({ isOpen: false, orderId: null })}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            No
          </button>
          <button
            onClick={confirmEndFitting}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FittingSection;
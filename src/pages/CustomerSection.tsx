import React, { useState, useMemo } from 'react';
import { ChevronDown, Phone, MapPin, User, Search, X } from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { Order } from '../types/Order';
import OrderCard from '../components/OrderCard';
import Modal from '../components/Modal';
import TabBar from '../components/TabBar';

interface CustomerSectionProps {
  onOrderClick: (billNo: string) => void;
}

interface WorkerInfo {
  name: string;
  phone: string;
  location: string;
}

const CustomerSection: React.FC<CustomerSectionProps> = ({ onOrderClick }) => {
  const [orders, setOrders] = useState<Order[]>(Object.values(mockOrders));
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: '',
    deliveryRating: 0,
    qualityRating: 0,
    serviceRating: 0
  });
  const [workerModal, setWorkerModal] = useState<{ isOpen: boolean; worker: WorkerInfo | null; type: string }>({
    isOpen: false,
    worker: null,
    type: ''
  });

  // Mock worker data
  const mockWorkers: Record<string, WorkerInfo> = {
    'KMSB-2425-000750': {
      name: 'Lokman Hossain',
      phone: '01713486720',
      location: 'Currently at Ghior Bazar, Manikganj'
    },
    'KMSB-2425-000751': {
      name: 'Karim Ahmed',
      phone: '01725116321',
      location: 'Currently at Dhanmondi, Dhaka'
    },
    'KMSB-2425-000752': {
      name: 'Rahim Khan',
      phone: '01855667788',
      location: 'Currently at New Town, Manikganj'
    },
    'KMSB-2425-000760': {
      name: 'Sajib Ahmed',
      phone: '01711223344',
      location: 'Currently at Mirpur DOHS, Dhaka'
    },
    'KMSB-2425-000761': {
      name: 'Tarek Rahman',
      phone: '01855667788',
      location: 'Currently at Uttara Sector 10, Dhaka'
    },
    'KMSB-2425-000762': {
      name: 'Nasir Uddin',
      phone: '01611223355',
      location: 'Currently at Banani, Dhaka'
    },
    'KMSB-2425-000763': {
      name: 'Shafiqul Islam',
      phone: '01555667799',
      location: 'Currently at Dhanmondi, Dhaka'
    },
    'KMSB-2425-000764': {
      name: 'Mizanur Rahman',
      phone: '01777889900',
      location: 'Currently at Mohammadpur, Dhaka'
    },
    'KMSB-2425-000765': {
      name: 'Jahangir Alam',
      phone: '01888990011',
      location: 'Currently at Gulshan 1, Dhaka'
    },
    'KMSB-2425-000766': {
      name: 'Rashidul Islam',
      phone: '01999001122',
      location: 'Currently at Baridhara, Dhaka'
    },
    'KMSB-2425-000801': {
      name: 'Rahim Ali',
      phone: '01812345678',
      location: 'Currently at Mirpur, Dhaka'
    },
    'KMSB-2425-000802': {
      name: 'Sultana Razia',
      phone: '01987654321',
      location: 'Currently at Gulshan, Dhaka'
    },
    'KMSB-2425-000804': {
      name: 'Nasreen Akter',
      phone: '01666123456',
      location: 'Currently at Uttara, Dhaka'
    },
    'KMSB-2425-000805': {
      name: 'Mominul Islam',
      phone: '01777123456',
      location: 'Currently at Mohammadpur, Dhaka'
    },
    'KMSB-2425-000806': {
      name: 'Farida Begum',
      phone: '01888123456',
      location: 'Currently at Bashundhara, Dhaka'
    },
    'KMSB-2425-000807': {
      name: 'Nazrul Islam',
      phone: '01999123456',
      location: 'Currently at Mirpur DOHS, Dhaka'
    },
    'KMSB-2425-000808': {
      name: 'Sabina Yasmin',
      phone: '01888123457',
      location: 'Currently at Gulshan, Dhaka'
    },
    'KMSB-2425-000811': {
      name: 'Rafiqul Islam',
      phone: '01555123460',
      location: 'Currently at Mohammadpur, Dhaka'
    },
    'KMSB-2425-000812': {
      name: 'Mominul Haque',
      phone: '01555123456',
      location: 'Currently at Bashundhara, Dhaka'
    },
    'KMSB-2425-000813': {
      name: 'Tahmina Rahman',
      phone: '01333123462',
      location: 'Currently at Dhanmondi, Dhaka'
    },
    'KMSB-2425-000814': {
      name: 'Shafiqul Islam',
      phone: '01222123463',
      location: 'Currently at Mirpur 10, Dhaka'
    },
    'KMSB-2425-000817': {
      name: 'Shirin Akter',
      phone: '01999123466',
      location: 'Currently at Uttara Sector 7, Dhaka'
    },
    'KMSB-2425-000818': {
      name: 'Rashidul Hasan',
      phone: '01888123467',
      location: 'Currently at Mohammadpur, Dhaka'
    }
  };

  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Processing', label: 'Process' },
    { id: 'Partial-Delivered', label: 'Partial-Delivered' },
    { id: 'Completed', label: 'Delivered' },
  ];

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Filter by type
    if (typeFilter !== 'All') {
      filtered = filtered.filter(order => 
        (typeFilter === 'Delivery' && order.type === 'Delivery') ||
        (typeFilter === 'Fitting' && order.type === 'Fitting')
      );
    }

    // Filter by status tab
    if (activeTab !== 'All') {
      filtered = filtered.filter(order => order.status === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(order => 
        order.billNo.toLowerCase().includes(query) ||
        order.orderNo.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerPhone.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [orders, typeFilter, searchQuery, activeTab]);

  const handleWorkerClick = (billNo: string) => {
    const order = orders.find(o => o.billNo === billNo);
    const worker = mockWorkers[billNo];
    if (worker && order) {
      setWorkerModal({
        isOpen: true,
        worker,
        type: order.type
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Way to Delivery</span>;
      case 'Processing':
        return <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Picked</span>;
      case 'Completed':
        return <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>;
      default:
        return null;
    }
  };

  const renderOrderActions = (order: Order) => {
    const isDelivery = order.type === 'Delivery';
    const isFitting = order.type === 'Fitting';
    const showButton = order.status === 'Pending' || order.status === 'Processing';

    if ((isDelivery || isFitting) && showButton) {
      const buttonText = isDelivery ? 'See Deliveryman' : 'See Fitterman';
      
      return (
        <button
          onClick={() => handleWorkerClick(order.billNo)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium w-full mt-3"
        >
          {buttonText}
        </button>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 bg-white text-gray-900 pl-4 pr-10 py-2.5 appearance-none cursor-pointer hover:border-gray-400 transition-all duration-200"
              >
                <option value="All">All Types</option>
                <option value="Delivery">Delivery</option>
                <option value="Fitting">Fitting</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
           <input
             type="text"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Bill No, Order No, Name, or Phone..."
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 bg-white text-gray-900 pl-10 pr-4 py-2.5 transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <TabBar tabs={tabs.map(t => ({...t, count: filteredOrders.filter(o => o.status === t.id || t.id === 'All').length }))} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

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
            <p className="text-gray-500 text-lg">No orders found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Worker Modal */}
        <Modal
          isOpen={workerModal.isOpen}
          onClose={() => setWorkerModal({ isOpen: false, worker: null, type: '' })}
          title={`${workerModal.type === 'Delivery' ? 'Deliveryman' : 'Fitterman'} Details`}
        >
          {workerModal.worker && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{workerModal.worker.name}</h3>
                  <p className="text-sm text-gray-600">{workerModal.type === 'Delivery' ? 'Deliveryman' : 'Fitterman'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span>{workerModal.worker.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{workerModal.worker.location}</span>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CustomerSection;
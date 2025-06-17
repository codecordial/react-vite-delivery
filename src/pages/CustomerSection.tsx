import React, { useState, useMemo } from 'react';
import { ChevronDown, Phone, MapPin, User, Search, X } from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { Order } from '../types/Order';
import SearchBar from '../components/SearchBar';
import OrderCard from '../components/OrderCard';
import Modal from '../components/Modal';

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
    'FITB-2425-000801': {
      name: 'Shahid Mia',
      phone: '01812345678',
      location: 'Currently at Gulshan, Dhaka'
    },
    'FITB-2425-000802': {
      name: 'Rafiqul Islam',
      phone: '01987654321',
      location: 'Currently at Gulshan 2, Dhaka'
    },
    'FITB-2425-000803': {
      name: 'Mominul Haque',
      phone: '01555123456',
      location: 'Currently at Banani, Dhaka'
    },
    'FITB-2425-000804': {
      name: 'Nazrul Islam',
      phone: '01666123456',
      location: 'Currently at Uttara Sector 11, Dhaka'
    },
    'FITB-2425-000805': {
      name: 'Shafiqul Islam',
      phone: '01777123456',
      location: 'Currently at Mirpur 10, Dhaka'
    },
    'FITB-2425-000806': {
      name: 'Kamrul Hasan',
      phone: '01888123456',
      location: 'Currently at Dhanmondi 27, Dhaka'
    }
  };

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Filter by type
    if (typeFilter !== 'All') {
      filtered = filtered.filter(order => 
        (typeFilter === 'Delivery' && order.billNo.startsWith('KMSB')) ||
        (typeFilter === 'Fitting' && order.billNo.startsWith('FITB'))
      );
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
  }, [orders, typeFilter, searchQuery]);

  const handleWorkerClick = (billNo: string) => {
    const worker = mockWorkers[billNo];
    if (worker) {
      setWorkerModal({
        isOpen: true,
        worker,
        type: typeFilter
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
    const worker = mockWorkers[order.billNo];
    if (!worker) return null;

    const isDelivery = order.billNo.startsWith('KMSB');
    const isFitting = order.billNo.startsWith('FITB');
    const isCompleted = order.status === 'Completed';
    const showButton = (order.status === 'Processing' || order.status === 'Pending') && !isCompleted;

    if ((isDelivery || isFitting) && showButton) {
      const buttonText = isDelivery ? 'See Deliveryman' : 'See FitterMan';
      
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

        {/* Worker Details Modal */}
        <Modal
          isOpen={workerModal.isOpen}
          onClose={() => setWorkerModal({ isOpen: false, worker: null, type: '' })}
          title={`${workerModal.type === 'Delivery' ? 'Deliveryman' : 'FitterMan'} Details`}
        >
          {workerModal.worker && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{workerModal.worker.name}</h4>
                  <p className="text-sm text-gray-600">{workerModal.type === 'Delivery' ? 'Delivery Person' : 'Fitting Specialist'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <Phone className="text-red-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium text-gray-900">{workerModal.worker.phone}</p>
                    <a 
                      href={`tel:${workerModal.worker.phone}`}
                      className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center gap-1 mt-1"
                    >
                      <Phone size={14} />
                      Call Now
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <MapPin className="text-red-600 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Live Location</p>
                    <p className="font-medium text-gray-900">{workerModal.worker.location}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-500 font-medium">Live Location Map</p>
                  <p className="text-gray-400 text-sm">Interactive map will be integrated</p>
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
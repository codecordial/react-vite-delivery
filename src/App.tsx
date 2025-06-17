import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import CustomerSection from './pages/CustomerSection';
import DeliverySection from './pages/DeliverySection';
import FittingSection from './pages/FittingSection';
import ProfileSection from './pages/ProfileSection';
import NotificationsSection from './pages/NotificationsSection';
import StaticPage from './pages/StaticPages';
import OrderDetailsSection from './pages/OrderDetailsSection';
import CustomerLocationSection from './pages/CustomerLocationSection';
import { mockOrders, mockNotifications, mockUserStats } from './data/mockData';
import { Order, Notification, UserStats } from './types/Order';

function App() {
  const [activeSection, setActiveSection] = useState('customer');
  const [previousSection, setPreviousSection] = useState('customer');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Record<string, Order>>(mockOrders);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
  };

  const hideToast = () => {
    setToast({ message: '', isVisible: false });
  };

  const handleSectionChange = (section: string) => {
    setPreviousSection(activeSection);
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleOrderClick = (billNo: string) => {
    const order = orders[billNo];
    if (order) {
      setSelectedOrder(order);
      setPreviousSection(activeSection);
      setActiveSection('order-details');
    }
  };

  const handleCustomerLocationClick = (billNo: string) => {
    const order = orders[billNo];
    if (order) {
      setSelectedOrder(order);
      setActiveSection('customer-location');
    }
  };

  const handleNotificationClick = () => {
    setActiveSection('notifications');
    setSidebarOpen(false);
  };

  const handleMarkNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleUpdateOrders = (newOrders: Record<string, Order>) => {
    setOrders(newOrders);
    
    // Update user stats
    const ordersList = Object.values(newOrders);
    const newStats: UserStats = {
      totalBills: ordersList.length,
      delivered: ordersList.filter(o => o.status === 'Completed').length,
      pending: ordersList.filter(o => o.status === 'Pending').length,
      processing: ordersList.filter(o => o.status === 'Processing').length
    };
    setUserStats(newStats);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const renderSection = () => {
    switch (activeSection) {
      case 'customer':
        return <CustomerSection onOrderClick={handleOrderClick} />;
      case 'dashboard':
        return (
          <DeliverySection 
            onOrderClick={handleOrderClick}
            onCustomerLocationClick={handleCustomerLocationClick}
            onShowToast={showToast}
            orders={orders}
            onUpdateOrders={handleUpdateOrders}
          />
        );
      case 'fitting':
        return (
          <FittingSection 
            onOrderClick={handleOrderClick}
            onShowToast={showToast}
            orders={orders}
            onUpdateOrders={handleUpdateOrders}
          />
        );
      case 'profile':
        return <ProfileSection userStats={userStats} />;
      case 'notifications':
        return (
          <NotificationsSection 
            notifications={notifications}
            onMarkAsRead={handleMarkNotificationAsRead}
          />
        );
      case 'about':
        return <StaticPage type="about" />;
      case 'terms':
        return <StaticPage type="terms" />;
      case 'order-details':
        return (
          <OrderDetailsSection 
            order={selectedOrder}
            onBack={() => setActiveSection(previousSection)}
            isCustomerView={previousSection === 'customer'}
          />
        );
      case 'customer-location':
        return (
          <CustomerLocationSection 
            order={selectedOrder}
            onBack={() => setActiveSection('dashboard')}
          />
        );
      default:
        return <CustomerSection onOrderClick={handleOrderClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onNotificationClick={handleNotificationClick}
        notificationCount={unreadNotificationCount}
      />
      
      <Sidebar 
        isOpen={sidebarOpen}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <main className="md:ml-64 mt-16 p-6">
        {renderSection()}
      </main>

      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
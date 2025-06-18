import React from 'react';
import { 
  Home, 
  Truck, 
  Wrench, 
  User, 
  Bell, 
  Info, 
  FileText, 
  LogOut,
  QrCode
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'customer', label: 'My Orders', icon: Home },
    { id: 'dashboard', label: 'Your Delivery', icon: Truck },
    { id: 'fitting', label: 'Your Fitting', icon: Wrench },
    { id: 'verification', label: 'Product Verification', icon: QrCode },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  ];

  return (
    <aside className={`
      w-64 bg-gray-50 fixed top-16 bottom-0 z-40 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}>
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-colors text-left
                ${activeSection === item.id 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
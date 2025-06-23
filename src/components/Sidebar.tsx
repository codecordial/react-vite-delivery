import React from 'react';
import { 
  Package, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  User, 
  Bell, 
  Info, 
  FileText,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
  userType: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  activeSection, 
  onSectionChange,
  userType 
}) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'verification', label: 'Product Verifications', icon: ShieldCheck },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'about', label: 'About Us', icon: Info },
      { id: 'terms', label: 'Terms & Conditions', icon: FileText }
    ];

    switch (userType) {
      case 'customer':
        return [
          { id: 'customer', label: 'My Orders', icon: Package },
          ...baseItems
        ];
      case 'deliveryman':
        return [
          { id: 'dashboard', label: 'Your Delivery', icon: Truck },
          ...baseItems
        ];
      case 'fitterman':
        return [
          { id: 'fitting', label: 'Your Fitting', icon: Wrench },
          ...baseItems
        ];
      default: // Fallback for when userType might be unset briefly
        return [];
    }
  };

  const menuItems = getMenuItems();

  const menuContent = (
    <>
      <div className="flex items-center flex-shrink-0 px-4 mb-6">
        <img
          src="/images/hatillogo.png"
          alt="HATIL Logo"
          className="h-8 w-auto"
        />
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors
                ${activeSection === item.id
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <Icon
                className={`
                  mr-3 flex-shrink-0 h-5 w-5
                  ${activeSection === item.id ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-500'}
                `}
              />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto p-2">
        <button
          onClick={() => onSectionChange('logout')}
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200 pt-5 pb-4">
          {menuContent}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => onSectionChange(activeSection)} // Closes sidebar without changing section
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            {menuContent}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
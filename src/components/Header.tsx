import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onNotificationClick: () => void;
  notificationCount: number;
  currentUser: string;
  userType: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle, 
  onNotificationClick, 
  notificationCount,
  currentUser,
  userType
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userTypeDisplay = userType.charAt(0).toUpperCase() + userType.slice(1);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30 md:ml-64">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 md:hidden"
            aria-controls="sidebar"
            aria-expanded="false"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden md:block ml-4">
            <h1 className="text-lg font-semibold text-gray-800">{getGreeting()}, {currentUser}!</h1>
            <p className="text-sm text-gray-500">You are logged in as a {userTypeDisplay}.</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onNotificationClick}
            className="relative p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          <div className="w-px h-6 bg-gray-200" aria-hidden="true"></div>

          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-red-600">
                {currentUser.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
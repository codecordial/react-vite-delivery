import React from 'react';
import { Menu, Bell, Clock, Calendar } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onNotificationClick: () => void;
  notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onNotificationClick, notificationCount }) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Dhaka'
    });
    const time = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Dhaka'
    });
    return { date, time };
  };

  const { date, time } = getCurrentDateTime();

  return (
    <header className="bg-[#929497] text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[94rem] mx-auto pl-4 pr-2 sm:pr-4 lg:pr-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none flex items-center justify-center h-10"
            >
              <Menu size={24} />
            </button>
            <img
              src="/images/hatillogo.png"
              alt="HATIL Logo"
              className="h-10 w-[136px] object-contain ml-0"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-200" />
                <span className="text-sm">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-200" />
                <span className="text-sm">{time}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">Shahin</p>
                <p className="text-xs text-gray-200">Admin</p>
              </div>
              
              <button
                onClick={onNotificationClick}
                className="p-2 rounded-full text-white hover:bg-gray-700 focus:outline-none relative group"
              >
                <Bell size={24} className="group-hover:animate-bounce" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-[#929497] bg-white rounded-full border-2 border-[#929497]">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
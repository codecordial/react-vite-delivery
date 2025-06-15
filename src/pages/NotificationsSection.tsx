import React from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { Notification } from '../types/Order';

interface NotificationsSectionProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({ 
  notifications, 
  onMarkAsRead 
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="text-red-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`
              bg-white border border-gray-200 rounded-lg p-4 shadow-sm
              ${notification.read ? 'opacity-70 bg-gray-50' : ''}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Date: {notification.date}
                </p>
                <p className="text-gray-800 mb-4">
                  {notification.message}
                </p>
              </div>
              
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium ml-4"
                >
                  <CheckCircle size={16} />
                  Mark as Read
                </button>
              )}

              {notification.read && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium ml-4">
                  <CheckCircle size={16} />
                  Read
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500 text-lg">No notifications</p>
          <p className="text-gray-400 text-sm mt-2">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsSection;
import React from 'react';
import { User, Phone, Truck, LogOut } from 'lucide-react';
import { UserStats } from '../types/User';

interface ProfileSectionProps {
  userStats: UserStats;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ userStats }) => {
  const handleLogout = () => {
    alert('Logged out!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">View your profile information and statistics</p>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
            S
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Shahin</h2>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <Truck size={16} />
              <span>Vehicle No: Dm-MA-11-4025</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <Phone size={16} />
              <span>01755647899</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Orders</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{userStats.totalBills}</div>
            <div className="text-sm text-gray-600">Total Bill</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{userStats.delivered}</div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{userStats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{userStats.processing}</div>
            <div className="text-sm text-gray-600">On Process</div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-start">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
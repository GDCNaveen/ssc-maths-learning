
import { useState } from 'react';
import { Search, User, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: string;
  onLogout: () => void;
}

const Header = ({ activeTab, onTabChange, currentUser, onLogout }: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    'All',
    'Mathematics', 
    'Physics',
    'Science',
    'Social',
    'Computer Science'
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      {/* Top bar with logo and user info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-white font-bold text-lg">Algot Academy</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
            <div className="flex items-center gap-2 text-white">
              <User size={16} />
              <span className="text-sm font-medium">{currentUser}</span>
              <button
                onClick={onLogout}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        {showSearch && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 px-4 py-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

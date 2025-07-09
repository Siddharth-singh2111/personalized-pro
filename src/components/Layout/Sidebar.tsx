'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/firebase/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  const navItems = [
    { label: 'Feed', href: '/' },
    { label: 'Favorites', href: '/favorites' },
    { label: 'Trending', href: '/trending' },
    { label: 'Recommendations', href: '/recommendations' },
    { label: 'Social Feed', href: '/social' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between py-6 px-4 shadow-lg">
      <div>
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8 px-2">
          <img src="/favicon.ico" className="w-8 h-8" alt="logo" />
          <h1 className="text-xl font-bold">Personalize<span className="text-blue-400">Pro</span></h1>
        </div>

        {/* Navigation */}
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md transition-all ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Profile section */}
      <div className="border-t border-gray-700 pt-4 flex items-center space-x-3 px-2">
        <FaUserCircle className="text-2xl text-blue-300" />
        <div className="flex-1">
          <p className="text-sm font-medium text-white truncate">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:underline mt-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

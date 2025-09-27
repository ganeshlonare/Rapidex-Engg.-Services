import React, { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown, Facebook, Twitter, Linkedin, Instagram, Youtube, User, ShoppingCart, CreditCard, Menu, X, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const TopHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const auth = useSelector((state: any) => state.authStore?.auth);

  // Handle mouse enter and leave for hover effect with delay (desktop only)
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) { // Only on desktop
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) { // Only on desktop
      timeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 150); // Small delay to allow moving to dropdown
    }
  };

  // Handle mobile dropdown toggle
  const handleMobileDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMyAccountClick = () => {
    setIsDropdownOpen(false);
    if (auth) {
      // Check if user is admin and redirect to admin dashboard
      if (auth.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/profile');
      }
    } else {
      router.push('/auth/login');
    }
  };

  const handleCartClick = () => {
    setIsDropdownOpen(false);
    router.push('/cart');
  };

  const handleCheckoutClick = () => {
    setIsDropdownOpen(false);
    router.push('/checkout');
  };

  const handleOrdersClick = () => {
    setIsDropdownOpen(false);
    router.push('/orders');
  };

  return (
    <div className="bg-white border-b border-gray-200 text-sm py-2 pt-4 pb-4">
      <div className="lg:px-32 px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <span className="font-medium">76203 02114</span>
            </div>
            <span className="text-gray-600 hover:text-orange-500 cursor-pointer transition-colors">
              Customer Support
            </span>
          </div>
          <div className="flex items-center space-x-6">
            {/* My Orders Link */}
            {auth ? (
              <div 
                onClick={handleOrdersClick}
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 cursor-pointer transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </div>
            ) : (
              <div 
                onClick={() => router.push('/auth/login')}
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 cursor-pointer transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </div>
            )}
            
            {/* My Account Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 cursor-pointer transition-colors"
              >
                <span>My Account</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Desktop Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button
                      onClick={handleMyAccountClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    >
                      <User className="w-4 h-4 mr-3" />
                      {auth ? 'My Profile' : 'Login / Register'}
                    </button>
                    <button
                      onClick={handleCartClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 mr-3" />
                      My Cart
                    </button>
                    <button
                      onClick={handleOrdersClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    >
                      <Package className="w-4 h-4 mr-3" />
                      My Orders
                    </button>
                    <button
                      onClick={handleCheckoutClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                    >
                      <CreditCard className="w-4 h-4 mr-3" />
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Facebook className="w-4 h-4 text-blue-600 hover:text-blue-800 cursor-pointer transition-colors" />
              <span className="text-gray-300">|</span>
              <Twitter className="w-4 h-4 text-blue-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <span className="text-gray-300">|</span>
              <Linkedin className="w-4 h-4 text-blue-700 hover:text-blue-900 cursor-pointer transition-colors" />
              <span className="text-gray-300">|</span>
              <Instagram className="w-4 h-4 text-pink-600 hover:text-pink-800 cursor-pointer transition-colors" />
              <span className="text-gray-300">|</span>
              <Youtube className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            {/* Mobile Phone Number */}
            <div className="flex items-center space-x-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <span className="font-medium text-xs">76203 02114</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Mobile My Orders */}
              {auth ? (
                <div 
                  onClick={handleOrdersClick}
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 cursor-pointer transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-xs">Orders</span>
                </div>
              ) : (
                <div 
                  onClick={() => router.push('/auth/login')}
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 cursor-pointer transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-xs">Login</span>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-4">
                {/* Customer Support */}
                <div className="text-gray-600 hover:text-orange-500 cursor-pointer transition-colors text-sm">
                  Customer Support
                </div>
                
                {/* My Account Section */}
                <div>
                  <button
                    onClick={handleMobileDropdownToggle}
                    className="flex items-center justify-between w-full text-gray-600 hover:text-orange-500 cursor-pointer transition-colors text-sm"
                  >
                    <span>My Account</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mobile Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="mt-2 ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                      <button
                        onClick={handleMyAccountClick}
                        className="flex items-center w-full text-sm text-gray-600 hover:text-orange-500 transition-colors py-2"
                      >
                        <User className="w-4 h-4 mr-3" />
                        {auth ? 'My Profile' : 'Login / Register'}
                      </button>
                      <button
                        onClick={handleCartClick}
                        className="flex items-center w-full text-sm text-gray-600 hover:text-orange-500 transition-colors py-2"
                      >
                        <ShoppingCart className="w-4 h-4 mr-3" />
                        My Cart
                      </button>
                      <button
                        onClick={handleOrdersClick}
                        className="flex items-center w-full text-sm text-gray-600 hover:text-orange-500 transition-colors py-2"
                      >
                        <Package className="w-4 h-4 mr-3" />
                        My Orders
                      </button>
                      <button
                        onClick={handleCheckoutClick}
                        className="flex items-center w-full text-sm text-gray-600 hover:text-orange-500 transition-colors py-2"
                      >
                        <CreditCard className="w-4 h-4 mr-3" />
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Social Media Icons */}
                <div className="flex items-center space-x-4 pt-2">
                  <Facebook className="w-4 h-4 text-blue-600 hover:text-blue-800 cursor-pointer transition-colors" />
                  <Twitter className="w-4 h-4 text-blue-400 hover:text-blue-600 cursor-pointer transition-colors" />
                  <Linkedin className="w-4 h-4 text-blue-700 hover:text-blue-900 cursor-pointer transition-colors" />
                  <Instagram className="w-4 h-4 text-pink-600 hover:text-pink-800 cursor-pointer transition-colors" />
                  <Youtube className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
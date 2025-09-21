'use client'
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ShoppingBag, List, GraduationCap, Menu, X, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { WEBSITE_HOME, WEBSITE_SHOP } from '@/routes/WebsiteRoute';
import TopHeader from './TopHeader';
import Cart from './Cart';
import logo from '@/public/assets/images/rapidex-logo.png';
import useFetch from '@/hooks/useFetch';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const categoriesRef = useRef(null);

  // Fetch categories
  const { data: categoriesResp, loading: categoriesLoading, error: categoriesError } = useFetch('/api/category/get-category');
  const categories = categoriesResp?.data || [];

  const isActive = (href) => {
    if (!href) return false;
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const navLinkClass = (href) =>
    `${isActive(href) ? 'text-orange-500' : 'text-gray-700'} hover:text-orange-500 text-sm font-medium`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen((prev) => !prev);
  };

  // Close dropdowns on route change
  useEffect(() => {
    setIsCategoriesOpen(false);
    setIsMoreMenuOpen(false);
  }, [pathname]);

  // Close categories on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setIsCategoriesOpen(false);
      }
    };
    if (isCategoriesOpen) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [isCategoriesOpen]);

  // Close categories on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsCategoriesOpen(false);
    };
    if (isCategoriesOpen) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isCategoriesOpen]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`${WEBSITE_SHOP}?q=${searchQuery.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <TopHeader />
      <header className="bg-white mb-4 relative">
        <div className="lg:px-32 px-4">
          {/* Screen overlay when categories open for easier outside click */}
          {isCategoriesOpen && (
            <div
              className="fixed inset-0 z-40"
              aria-hidden="true"
              onClick={() => setIsCategoriesOpen(false)}
            />
          )}
          {/* Desktop Top Row */}
          <div className="hidden md:flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={WEBSITE_HOME}>
                <Image
                  src={logo}
                  width={100}
                  height={40}
                  alt='Rapidex Logo'
                  className='h-10 w-auto'
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-purple-600">
                <Heart className="w-5 h-5" />
              </button>
              <Cart />
            </div>
          </div>

          {/* Mobile Top Row */}
          <div className="md:hidden flex items-center justify-between py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-orange-500"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={WEBSITE_HOME}>
                <Image
                  src={logo}
                  width={80}
                  height={32}
                  alt='Rapidex Logo'
                  className='h-8 w-auto'
                />
              </Link>
            </div>

            {/* Mobile Right Icons */}
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-purple-600">
                <Heart className="w-5 h-5" />
              </button>
              <Cart />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation Row */}
          <div className="hidden lg:flex items-center justify-between py-2 border-t border-gray-100">
            {/* Left Navigation */}
            <div className="flex items-center space-x-6">
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={toggleCategories}
                  aria-haspopup="menu"
                  aria-expanded={isCategoriesOpen}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center space-x-2 text-sm font-medium transition-colors cursor-pointer"
                >
                  <List className="w-4 h-4" />
                  <span>All Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoriesOpen && (
                  <div
                    role="menu"
                    aria-label="All Categories"
                    className="absolute left-0 mt-2 w-[320px] h-80 overflow-y-auto scrollbar-menu bg-white border border-gray-200 rounded-md shadow-lg z-50 origin-top transition-all duration-150 ease-out"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <div className="py-2">
                      {categoriesLoading && (
                        <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                      )}
                      {categoriesError && (
                        <div className="px-4 py-2 text-sm text-red-500">Failed to load categories</div>
                      )}
                      {!categoriesLoading && !categoriesError && categories.length === 0 && (
                        <div className="px-4 py-2 text-sm text-gray-500">No categories</div>
                      )}
                      {!categoriesLoading && !categoriesError && categories.map((cat) => (
                        <Link
                          key={cat._id}
                          href={`${WEBSITE_SHOP}?category=${cat.slug}`}
                          className="block px-4 py-2 text-sm transition-colors text-gray-700 hover:text-orange-500 hover:bg-gray-100"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link href={WEBSITE_HOME} className={navLinkClass(WEBSITE_HOME)}>Home</Link>
              <Link href="/about-us" className={navLinkClass('/about-us')}>About</Link>
              <Link href={WEBSITE_SHOP} className={navLinkClass(WEBSITE_SHOP)}>Shop</Link>
              <Link href={`${WEBSITE_SHOP}?category=electronics-hardwares`} className={navLinkClass('/electronics-hardwares')}>Electronics Hardwares</Link>
              <Link href={`${WEBSITE_SHOP}?category=industrial-hardwares`} className={navLinkClass('/industrial-hardwares')}>Industrial Hardwares</Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="space-y-3">
                <Link href={WEBSITE_HOME} className={`block w-full text-center py-3 text-lg font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${isActive(WEBSITE_HOME) ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                  Home
                </Link>
                <Link href="/about-us" className={`block w-full text-center py-3 text-lg font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${isActive('/about-us') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                  About
                </Link>
                <Link href={WEBSITE_SHOP} className={`block w-full text-center py-3 text-lg font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${isActive(WEBSITE_SHOP) ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                  Shop
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
import { getProductCategories } from '../data-access/products';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import SearchProducts from './search-products';
import Modal from '../ui/modal';
import AuthForm from '../../authentication/components/auth-form';
import { useAuth } from '../../authentication/components/auth-provider';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  const title = 'Products';
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { loginData, logout } = useAuth();
  const {
    data: catData,
  } = useQuery({
    queryKey: ['product-categories'],
    queryFn: () => getProductCategories(),
  });

  const logoutFromLayout = () => {
    logout();
    navigate('/');
  };

  const addProduct = () => {
    navigate(`/products/add`);
  };

  const setSearchTerm = useCallback((searchText: string) => {
    setSearchText(searchText);
  }, []);

  const handleLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0).toUpperCase()}${last.charAt(0).toUpperCase()}`;
  };

  return (
    // Tailwind wrapper styling
    // 1. LOCKED VIEWPORT: Changed 'min-h-screen' to 'h-screen flex flex-col overflow-hidden'
    <div className="h-screen bg-gray-50 p-6 font-sans flex flex-col overflow-hidden">
      {/* FIXED HEADER TOOLBAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <Link to="/products" className="group block focus:outline-none">
          <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h1>
        </Link>

        <div className="flex-1 max-w-2xl mx-0 md:mx-6">
          <SearchProducts onSearchChange={setSearchTerm} />
        </div>

        <button
          onClick={addProduct}
          type="submit"
          className="md:w-auto w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm py-2.5 px-5 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer whitespace-nowrap"
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Product
        </button>
        {!loginData && (
          <button
            onClick={handleLogin} // Replace with your actual auth handler function
            type="button"
            className="md:w-auto w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-sm py-2.5 px-5 rounded-xl border border-gray-200 shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer whitespace-nowrap"
          >
            <svg
              xmlns="http://w3.org"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Login
          </button>
        )}
        {loginData && (
          <div className="flex items-center gap-3">
            <div
              title={`${loginData.firstName} ${loginData.lastName}`}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-xs select-none"
            >
              {getInitials(loginData.firstName, loginData.lastName)}
            </div>
            <Link
              to="/cart"
              className="group relative flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-xs py-1.5 px-3 rounded-lg border border-gray-200 shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap"
            >
              {/* Shopping Cart SVG Icon (Heroicons outline) */}
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-3.5 h-3.5 text-gray-500 group-hover:text-indigo-600 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>

              <span>Cart</span>
            </Link>

            <button
              onClick={logoutFromLayout}
              type="button"
              className="flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-xs py-1.5 px-3 rounded-lg border border-gray-200 shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer whitespace-nowrap"
            >
              {/* Logout SVG Icon */}
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-3.5 h-3.5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3-3H18M3.75 12l3-3m-3 3 3 3"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* BODY SPLIT LAYER */}

      <div className="flex flex-col md:flex-row gap-6 items-start flex-1 min-h-0">
        <aside className="w-full md:w-64 h-full max-h-full bg-white p-4 rounded-2xl border border-gray-100 shadow-xs shrink-0 flex flex-col overflow-hidden">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-2 shrink-0">
            Categories
          </h2>

          <div className="flex flex-col gap-1 overflow-y-auto pr-1 flex-1">
            {catData &&
              catData.map((cat, index) => (
                <button
                  key={cat.slug}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer whitespace-nowrap ${index === 0
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
          </div>
        </aside>

        {/* INDEPENDENTLY SCROLLABLE PRODUCT LIST ZONE */}
        <div className="flex-1 w-full h-full overflow-y-auto pr-2 pb-6">
          <Outlet context={{ searchText }} />
        </div>
      </div>

      <Modal isOpen={isLoginModalOpen} onClose={handleLogin}>
        <AuthForm onSuccessClose={handleLogin} />
      </Modal>
    </div>
  );
}

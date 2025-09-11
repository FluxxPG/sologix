"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import img from "../../public/header_logo.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { loadSessionFromLocal, logout } from "@/redux/action";
import React, { useEffect, useState } from "react";
import { Dropdown } from "antd";
import { API } from "@/utils";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const { isLoading, userSession } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [cartList, setCartList] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCartListing = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      setLoading(true);
      const userSession = localStorage.getItem("userSession");
      const parsedSession = userSession ? JSON.parse(userSession) : null;
      const accessToken = parsedSession?.access_token;

      if (!accessToken) {
        setCartList(null);
        return;
      }

      const response = await API.get("/cart/Get-user-cart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Handle different cart response structures
        let cartItems = [];

        if (Array.isArray(response.data)) {
          cartItems = response.data;
        } else if (response.data?.data?.cart) {
          cartItems = Array.isArray(response.data.data.cart) ? response.data.data.cart : [];
        } else if (response.data?.cart) {
          cartItems = Array.isArray(response.data.cart) ? response.data.cart : [];
        } else if (response.data?.data) {
          cartItems = Array.isArray(response.data.data) ? response.data.data : [];
        }

        setCartList(cartItems);
      } else {
        setCartList(null);
      }
    } catch (error) {
      setCartList(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const userSession = localStorage.getItem("userSession");
    const parsedSession = userSession ? JSON.parse(userSession) : null;
    
    if (parsedSession?.access_token) {
      dispatch(loadSessionFromLocal(parsedSession));
      getCartListing();
    } else {
      dispatch(loadSessionFromLocal(""));
      setCartList(null);
    }
  }, [dispatch, mounted]);

  const menuItems = [
    { name: "Home", route: userSession ? "/afterleadingpage" : "/" },
    { name: "About Us", route: "/aboutus" },
    { name: "For Home", route: "/forhome" },
    { name: "For Business", route: "/solorbusiness" },
    { name: "Become a Partner", route: "/becomepartner" },
    { name: "Resource", route: "/resource" },
    { name: "Contact Us", route: "/contactus" },
    { name: "Login", route: "/login" },
  ];

  const handleClickLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userSession");
    router.replace("/");
  };

  const dropdownItems = [
    {
      key: "1",
      label: <a href="/">Home</a>,
    },
    {
      key: "2",
      label: <a href="/payment-history">My Payments</a>,
    },
    {
      key: "3",
      label: <button onClick={handleClickLogout}>Logout</button>,
    },
  ];

  // Helper function to check if a route is active
  const isActiveRoute = (route) => {
    if (route === "/" && pathname === "/") return true;
    if (route === "/afterleadingpage" && pathname === "/afterleadingpage") return true;
    if (route !== "/" && route !== "/afterleadingpage" && pathname.startsWith(route)) return true;
    return false;
  };

  // Cart icon component to avoid duplication
  const CartIcon = ({ size = 24, showCount = true, className = "" }) => (
    <a href="/cart" className={`relative flex items-center justify-center p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200 group ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {showCount && !loading && Array.isArray(cartList) && cartList.length > 0 && (
        <div className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ${
          size === 20 ? 'w-4 h-4 text-[10px]' : 'w-5 h-5 text-xs'
        }`}>
          {Math.min(cartList.length, 9)}
        </div>
      )}
    </a>
  );

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        classNames={{
          wrapper: "px-4 sm:px-6 lg:px-8 py-0",
          base: "h-16"
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <NavbarContent className="flex-grow-0 p-0 m-0">
            <NavbarBrand className="m-0">
              <Link href="/" className="cursor-pointer">
                <Image
                  src={img}
                  alt="Sologix Energy Logo"
                  className="h-auto w-auto"
                  style={{ maxWidth: "120px" }}
                  priority
                />
              </Link>
            </NavbarBrand>
          </NavbarContent>

          {/* Desktop Navigation */}
          <NavbarContent className="hidden xl:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-6">
              {menuItems
                .filter(item => item.name !== "Login")
                .map((item) => {
                  const isActive = isActiveRoute(item.route);
                  return (
                <NavbarItem key={item.route}>
                  <Link
                    href={item.route}
                        className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-sm hover:shadow-sm ${
                          isActive
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                  >
                    {item.name}
                  </Link>
                </NavbarItem>
                  );
                })}
            </div>
          </NavbarContent>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end gap-6 h-full">
            {!userSession ? (
              <Button
                as={Link}
                href="/login"
                className="hidden xl:flex px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
              >
                Login
              </Button>
            ) : (
              <>
                {/* Mobile Cart Icon */}
                <div className="flex xl:hidden items-center">
                  <CartIcon size={20} className="hover:scale-105" />
                </div>

                {/* Desktop Cart and Account */}
                <div className="hidden xl:flex items-center gap-6 h-full">
                  <Dropdown
                    menu={{ items: dropdownItems }}
                    className="cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 px-5 py-2.5 rounded-lg transition-all duration-200 min-w-[120px] text-center group border border-blue-200 hover:border-blue-300 hover:shadow-md flex items-center justify-center h-full">
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-700 group-hover:text-blue-800 transition-colors duration-200"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span className="text-blue-800 font-semibold whitespace-nowrap text-sm group-hover:text-blue-900 transition-colors duration-200">My Account</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                          className="text-blue-700 group-hover:text-blue-800 transition-colors duration-200"
                  >
                          <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                    </div>
                  </div>
                </Dropdown>
                  
                  <div className="flex items-center h-full">
                    <CartIcon size={24} />
                  </div>
              </div>
              </>
            )}
            
            {/* Mobile menu button */}
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="xl:hidden p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105 group"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <NavbarMenu className="pt-6 pb-8 bg-gradient-to-b from-white to-gray-50">
          <div className="px-4 mb-6">
            <div className="h-1 w-12 bg-blue-500 rounded-full mx-auto"></div>
          </div>
          
          {menuItems
            .filter(item => !userSession || item.name !== "Login")
            .map((item, index) => {
              const isActive = isActiveRoute(item.route);
              return (
                <NavbarMenuItem key={item.route} className="px-4">
              <Link
                    className={`w-full py-4 px-4 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                href={item.route}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-blue-500" : "bg-gray-400"
                      }`}></div>
                      <span className="text-base">{item.name}</span>
                    </div>
                  </Link>
                </NavbarMenuItem>
              );
            })}
          
          {/* Mobile Cart and Account Links */}
          {userSession && (
            <>
              <div className="px-4 my-4">
                <div className="h-px bg-gray-200"></div>
              </div>
              
              <NavbarMenuItem className="px-4">
                <Link
                  className="w-full flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group border border-blue-100 hover:border-blue-200"
                  href="/cart"
                  size="lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-700"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200 text-base">My Cart</span>
                    <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200">View your items</p>
                  </div>
                  {!loading && Array.isArray(cartList) && cartList.length > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                      {Math.min(cartList.length, 9)}
                    </div>
                  )}
                </Link>
              </NavbarMenuItem>
              
              <NavbarMenuItem className="px-4">
                <Link
                  className="w-full flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-green-50 transition-all duration-200 group border border-green-100 hover:border-green-200"
                  href="/payment-history"
                  size="lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-700"
                    >
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <path d="m16 8 2 2-2 2"></path>
                      <path d="M11 12H3"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-200 text-base">My Payments</span>
                    <p className="text-sm text-gray-500 group-hover:text-green-600 transition-colors duration-200">Payment history</p>
                  </div>
              </Link>
            </NavbarMenuItem>
              
              <NavbarMenuItem className="px-4">
                <button
                  className="w-full flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-red-50 transition-all duration-200 group text-left border border-red-100 hover:border-red-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleClickLogout();
                  }}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16,17 21,12 16,7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-red-600 group-hover:text-red-700 transition-colors duration-200 text-base">Logout</span>
                    <p className="text-sm text-gray-500 group-hover:text-red-600 transition-colors duration-200">Sign out of account</p>
                  </div>
                </button>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default Header;

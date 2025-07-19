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
import { Dropdown, Space } from "antd";
import { API } from "@/utils";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isLoading, userSession } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [cartList, setCartList] = useState(null);

  const getCartListing = async () => {
    // Only run on client-side after mount
    if (typeof window === 'undefined') return;
    
    try {
      setLoading(true);
      const response = await API.get("/cart/Get-user-cart");
      setCartList(response.data.cart || null);
    } catch (error) {
      // Error is already handled by the interceptor
      setCartList(null);
    } finally {
      setLoading(false);
    }
  };

  // Track component mount state to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  useEffect(() => {
    // Only run on client-side after mount
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {/* Logo - Far Left */}
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

          {/* Desktop Navigation - Center */}
          <NavbarContent className="hidden xl:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-6">
              {menuItems.slice(0, -1).map((item) => (
                <NavbarItem key={item.route}>
                  <Link
                    href={item.route}
                    className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                </NavbarItem>
              ))}
            </div>
          </NavbarContent>

          {/* Right Side Actions - Far Right */}
          <div className="flex items-center gap-4">
            {!userSession ? (
              <Button
                as={Link}
                href="/login"
                className="hidden xl:flex px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Login
              </Button>
            ) : (
              <div className="hidden xl:flex items-center">
                <a href="/cart" className="relative p-2 mr-4 rounded-full hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {!loading && cartList?.length > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartList.length}
                    </div>
                  )}
                </a>
                
                <Dropdown
                  menu={{ items: dropdownItems }}
                  className="cursor-pointer"
                >
                  <div className="bg-blue-50 hover:bg-blue-100 px-6 py-2.5 rounded-full transition-colors duration-200 min-w-[130px] text-center">
                    <span className="text-blue-800 font-medium whitespace-nowrap">My Account</span>
                  </div>
                </Dropdown>
              </div>
            )}
            
            {/* Mobile menu button */}
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="xl:hidden"
            />
          </div>
        </div>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={item.route}>
              <Link
                className="w-full"
                color={
                  index === 0
                    ? "warning"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.route}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default Header;

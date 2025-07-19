'use client';
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
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import img from "../../public/header_logo.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { loadSessionFromLocal, logout } from "@/redux/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, User, LogOut, Settings, Home, CreditCard } from "lucide-react";
import Cart from "./Cart/Cart";

const NewHeader = () => {
  const { isLoading, userSession } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartList, setCartList] = useState(null);

  const getCartListing = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      setLoading(true);
      const response = await API.get("/cart/Get-user-cart");
      setCartList(response.data.cart || null);
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
    if (mounted) {
      dispatch(loadSessionFromLocal());
    }
  }, [mounted, dispatch]);

  const handleClickLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <Navbar isBordered className="bg-white" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        {/* Mobile menu toggle */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile logo */}
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link href="/">
              <Image 
                src={img} 
                alt="Sologix Logo" 
                width={150} 
                height={40} 
                priority
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop logo */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Link href="/">
              <Image 
                src={img} 
                alt="Sologix Logo" 
                width={150} 
                height={40} 
                priority
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Navigation items */}
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link 
                href={item.href} 
                color="foreground"
                className="hover:text-primary transition-colors text-sm font-medium px-2 py-1 rounded-md"
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right side items */}
        <NavbarContent justify="end" className="flex items-center gap-4">
          {/* Cart */}
          {userSession?.user && (
            <NavbarItem>
              <Button
                isIconOnly
                variant="light"
                className="relative"
                onPress={() => router.push('/cart')}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartList?.items?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Math.min(cartList.items.length, 9)}
                  </span>
                )}
              </Button>
            </NavbarItem>
          )}
          
          {/* Auth buttons */}
          {!userSession?.user ? (
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/login"
                variant="flat"
                isLoading={isLoading}
              >
                Login
              </Button>
            </NavbarItem>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  className="rounded-full"
                >
                  <Avatar
                    size="sm"
                    name={userSession?.user?.name || 'User'}
                    className="transition-transform"
                    color="primary"
                    isBordered
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userSession?.user?.email}</p>
                </DropdownItem>
                <DropdownItem 
                  key="home" 
                  startContent={<Home size={18} />}
                  href="/"
                >
                  Home
                </DropdownItem>
                <DropdownItem 
                  key="my_profile" 
                  startContent={<User size={18} />}
                  href="/profile"
                >
                  My Profile
                </DropdownItem>
                <DropdownItem 
                  key="payment_history" 
                  startContent={<CreditCard size={18} />}
                  href="/payment-history"
                >
                  Payment History
                </DropdownItem>
                <DropdownItem 
                  key="settings" 
                  startContent={<Settings size={18} />}
                  href="/settings"
                >
                  Settings
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  onClick={handleClickLogout}
                  startContent={<LogOut size={18} />}
                  className="text-danger"
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarContent>

        {/* Mobile menu */}
        <NavbarMenu className="pt-4">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className="w-full py-2 px-4 text-default-900 hover:bg-default-100 rounded-md transition-colors block"
                href={item.href}
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

export default NewHeader;

import { useEffect, useMemo, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";

import { Link } from "@tanstack/react-router";

import Menu from "@/components/client/Menu";
import MenuMobile from "@/components/client/MenuMobile";
import { Loading } from "@/components/common/Loading";
import Wrapper from "@/components/common/Wrapper";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { useCart } from "@/store/cart.store";
import { useWishlist } from "@/store/wishlist.store";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const { data, isLoading } = useGetCategories();

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const totalCartItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems.length]
  );
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="flex justify-between items-center h-[60px]">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="nike-logo"
            width={60}
            height={60}
            className="w-[40px] md:w-[60px]"
          />
        </Link>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Menu
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              categories={data}
            />

            {mobileMenu && (
              <MenuMobile
                showCatMenu={showCatMenu}
                setShowCatMenu={setShowCatMenu}
                setMobileMenu={setMobileMenu}
                categories={data}
              />
            )}
          </>
        )}

        {/* Icons Section */}
        <section className="flex items-center gap-2 text-black">
          {/* Wishlist */}
          <Link href="/wishlist">
            <div className="relative flex justify-center items-center hover:bg-black/[0.05] rounded-full w-8 md:w-12 h-8 md:h-12 cursor-pointer">
              <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
              {wishlistItems.length > 0 && (
                <div className="top-1 left-5 md:left-7 absolute flex justify-center items-center bg-red-600 px-[2px] md:px-[5px] rounded-full min-w-[14px] md:min-w-[18px] h-[14px] md:h-[18px] text-[10px] text-white md:text-[12px]">
                  {wishlistItems.length}
                </div>
              )}
            </div>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <div className="relative flex justify-center items-center hover:bg-black/[0.05] rounded-full w-8 md:w-12 h-8 md:h-12 cursor-pointer">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="top-1 left-5 md:left-7 absolute flex justify-center items-center bg-red-600 px-[2px] md:px-[5px] rounded-full min-w-[14px] md:min-w-[18px] h-[14px] md:h-[18px] text-[10px] text-white md:text-[12px]">
                  {totalCartItems}
                </div>
              )}
            </div>
          </Link>

          {/* Mobile Menu */}
          <div className="relative flex justify-center items-center md:hidden hover:bg-black/[0.05] -mr-2 rounded-full w-8 md:w-12 h-8 md:h-12 cursor-pointer">
            {mobileMenu ? (
              <VscChromeClose
                className="text-16px"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-20px"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </section>
      </Wrapper>
    </header>
  );
};

export default Header;

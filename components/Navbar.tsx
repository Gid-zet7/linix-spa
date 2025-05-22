"use client";
import { useEffect } from "react";
import { Button } from "./ui/button";
import localFont from "next/font/local";
import { CalendarHeart } from "lucide-react";

const hertica = localFont({
  src: "../app/fonts/hertica.ttf",
  // weight: "100 900",
});

const Navbar = () => {
  useEffect(() => {
    const navbarMenu = document.getElementById("menu");
    const burgerMenu = document.getElementById("burger");
    const overlayMenu = document.querySelector(".overlay");

    if (burgerMenu && navbarMenu) {
      const toggleMenu = () => {
        burgerMenu.classList.toggle("is-active");
        navbarMenu.classList.toggle("is-active");
      };

      burgerMenu.addEventListener("click", toggleMenu);

      return () => burgerMenu.removeEventListener("click", toggleMenu);
    }

    // Close Navbar Menu on Click Links
    const menuLinks = document.querySelectorAll(".menu-link");
    menuLinks.forEach((link) => {
      const handleLinkClick = () => {
        burgerMenu?.classList.remove("is-active");
        navbarMenu?.classList.remove("is-active");
      };

      link.addEventListener("click", handleLinkClick);

      return () => link.removeEventListener("click", handleLinkClick);
    });

    const handleResize = () => {
      if (window.innerWidth >= 992) {
        if (navbarMenu?.classList.contains("is-active")) {
          navbarMenu.classList.remove("is-active");
          overlayMenu?.classList.remove("is-active");
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header className="header font-mono text-" id="header">
      <nav className="flex justify-between items-center md:grid md:grid-cols-5 py-4 px-1">
        <a
          href="/"
          className={`brand font-extrabold text-lg md:text-2xl ${hertica.className}`}
        >
          Linix Spa
        </a>
        <div className="burger" id="burger">
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
        <div className="menu block md:hidden" id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <a href="/book-appointment" className="menu-link">
                <Button
                  variant={"outline"}
                  className=" font-bold text-md rounded-lg"
                >
                  Book us <CalendarHeart />
                </Button>
              </a>
            </li>
            <li className="menu-item">
              <a href="#about" className="menu-link">
                About
              </a>
            </li>
            <li className="menu-item">
              <a href="#services" className="menu-link">
                Services
              </a>
            </li>
            <li className="menu-item">
              <a href="#contact" className="menu-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* <div className="menu hidden md:block" id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <a href="#work" className="menu-link">
                Work
              </a>
            </li>
          </ul>
        </div> */}
        <div className="menu hidden md:block" id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <a href="#about" className="menu-link">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="menu hidden md:block" id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <a href="#services" className="menu-link">
                Services
              </a>
            </li>
          </ul>
        </div>
        <div className="menu hidden md:block" id="menu">
          <ul className="menu-inner">
            <li className="menu-item">
              <a href="#contact" className="menu-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="menu hidden md:block" id="menu">
          <ul className="menu-inner font-bold text-lg bg-black rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out px-4 py-2">
            <li className="menu-item">
              <a href="/book-appointment" className=" text-white text-sm">
                Book Now
              </a>
            </li>
          </ul>
        </div>
        <button className="switch" id="switch">
          <i className="switch-light bx bx-sun"></i>
          <i className="switch-dark bx bx-moon"></i>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;

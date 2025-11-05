"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import LogoutBtn from "./LogoutBtn";

function LayoutContent({ children }) {
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const toggleNavbar = () => setNavbarVisible((v) => !v);

  const { data: session } = useSession();
  const router = useRouter();
  const navbarRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLinkClick = (param) => {
    if (!session) {
      if (param === "/signin") {
        setNavbarVisible(false);
        router.push(param);
      } else {
        alert("Only for Ghostwriter. Please sign in.");
        router.push("/");
      }
    } else {
      setNavbarVisible(false);
      router.push(param);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setNavbarVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="btn_navbar" onClick={toggleNavbar} ref={buttonRef}>
        <Image
          src="/images/menu.svg"
          alt="menu_button"
          width={25}
          height={25}
        />
      </div>

      <div
        className={`navbar ${isNavbarVisible ? "visible" : ""}`}
        ref={navbarRef}
      >
        <div className="wrapLink">
          <button className="button" onClick={() => handleLinkClick("/")}>
            BOOK CLUB OF GHOST
          </button>
          <button
            className="button"
            onClick={() => handleLinkClick("/myJournal")}
          >
            MY READING JOURNAL
          </button>
          <button
            className="button"
            onClick={() => handleLinkClick("/trickOrTreat")}
          >
            TRICK OR TREAT
          </button>

          {session ? (
            <div>
              <LogoutBtn />
            </div>
          ) : (
            <button
              className="button"
              onClick={() => handleLinkClick("/signin")}
            >
              SIGN IN
            </button>
          )}

          <Image
            src="/images/ghostwithoutpen.svg"
            alt="ghost"
            width={500}
            height={500}
            className="img_navbar"
          />
          <p className="peekabook">PEEK A BOOK</p>
        </div>
      </div>

      {children}
    </>
  );
}

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}

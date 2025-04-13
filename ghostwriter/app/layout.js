// layout.js
"use client";
import { useRouter } from "next/navigation";
import "./layout.css";
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { SessionProvider, useSession } from "next-auth/react";
import LogoutBtn from "./LogoutBtn";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      {/* <useSession> 훅을 <SessionProvider> 컴포넌트 내부로 이동 */}
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}
function LayoutContent({ children }) {
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };
  const { data: session } = useSession(); // 클라이언트 사이드에서 세션을 가져옵니다
  const router = useRouter();
  const navbarRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLinkClick = (param) => {
    if (!session) {
      if (param == "/signin") {
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef, buttonRef]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="btn_navbar" onClick={toggleNavbar} ref={buttonRef}>
          <Image
            src="/images/menu.svg"
            alt="menu_button"
            width={25}
            height={25}
          />
        </div>
        <div
          className={`navbar ${isNavbarVisible ? "visible" : ""} `}
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
            {session != null ? (
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
      </body>
    </html>
  );
}

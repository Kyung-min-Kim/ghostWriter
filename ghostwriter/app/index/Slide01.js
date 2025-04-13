"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/scrollbar";
import "../swiper.css";

export default function Slide01() {
  const [subtitle1Visible, setSubtitle1Visible] = useState(false);
  const [subtitle2Visible, setSubtitle2Visible] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };
  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSubtitle1Visible(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setSubtitle2Visible(true);
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  return (
    <div className="first_slide">
      <div className="title_box">
        <p className={`sub_title_1 ${subtitle1Visible ? "visible" : ""}`}>
          Welcome to book club of ghost
        </p>
        <p className={`sub_title_2 ${subtitle2Visible ? "visible" : ""}`}>
          Are you ready to peek a book?
        </p>
      </div>
      <Image
        src="/images/mainGhost.svg"
        alt="main_ghost"
        width={650}
        height={650}
        className={`first_slide_img ${isMouseOver ? "fade-out" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

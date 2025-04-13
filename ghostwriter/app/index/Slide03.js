"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Scrollbar,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "../swiper.css";

export default function Slide03() {
  return (
    <div className="third_slide">
      <Swiper
        scrollbar={{ draggable: true, forceToAxis: true }}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Scrollbar]}
        slidesPerView={3}
        spaceBetween={70}
        className="slide3_swiper"
      >
        <h3>How to join book club</h3>
        <SwiperSlide>
          <h4 className="slide3_h4_1">Prove that you're a ghost</h4>
          <p className="slide3_p_1">Create account</p>
          <Image
            src="/images/Ghost_b.svg"
            alt="ghost_image"
            width={200}
            height={200}
            className="black_ghost"
          />
          <Link href="/signin" className="link_signin">
            Sign in
          </Link>
          <p className="slide3_p_number">1</p>
        </SwiperSlide>
        <SwiperSlide>
          <h4 className="slide3_h4_2">Peek a book for this month</h4>
          <p className="slide3_p_2">
            Ghost voted books for this month’s book club. Peek a book among
            them.
          </p>
          <span className="slide3_span">
            (You can still write your reading journal for other books)
          </span>
          <Image
            src="images/ghostwithoutpen.svg"
            alt="ghost_image"
            width={350}
            height={350}
            className="white_ghost"
          />
          <p className="slide3_p_number">2</p>
        </SwiperSlide>
        <SwiperSlide>
          <h4 className="slide3_h4_3">Write your reading journal</h4>
          <p className="slide3_p_3">
            You don’t need to hide anymore.
            <br /> Be any ghost as you want.
            <br /> If you’re not ready to share your reading journal, we can
            wait! But when you ready, just check the small box written ‘share’.
          </p>
          <Link href="/myJournal" className="link_myreadingjournal">
            My reading journal
          </Link>
          <p className="slide3_p_number">3</p>
        </SwiperSlide>
        <SwiperSlide>
          <h4 className="slide3_h4_4">Read other ghost's journal carefully</h4>
          <p className="slide3_p_4">
            You can read other ghost’s reading journals. If you’re brave enough,
            you can give a candy to them!
          </p>
          <Image
            src="/images/mint.png"
            alt="candy"
            width={50}
            height={50}
            className="candy_image"
          />
          <Link href="/trickOrTreat" className="link_bookclub">
            Enter the book club
          </Link>
          <p className="slide3_p_number">4</p>
        </SwiperSlide>
        <SwiperSlide>
          <h4 className="slide3_h4_5">Vote for next month's book in secret</h4>
          <p className="slide3_p_5">
            Dont’t worry.
            <br /> Other ghosts can not know your vote
          </p>
          <Image
            src="/images/feather.svg"
            alt="feather"
            width={120}
            height={120}
            className="feather_image"
          />
          <p className="slide3_p_number">5</p>
        </SwiperSlide>
        <SwiperSlide>
          <h4 className="slide3_h4_6">Don't forget you're a ghost</h4>
          <p className="slide3_p_6">
            Please stay anonymous.
            <br /> Ghosts are very shy.
            <br /> You might scare them!
          </p>
          <Image
            src="/images/Ghost.svg"
            alt="ghost"
            width={200}
            height={200}
            className="small_ghost"
          />
          <p className="slide3_p_number">6</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

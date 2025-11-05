// app/HomeClient.js
"use client";

import { useEffect } from "react";
import Image from "next/image";

// ✅ 클라 컴포넌트이므로 정적 import 괜찮음
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Scrollbar, Pagination, Keyboard } from "swiper/modules";

import Slide01 from "./index/Slide01";
import Slide02 from "./index/Slide02";
import Slide03 from "./index/Slide03";

export default function HomeClient({ redirectedFrom }) {
  useEffect(() => {
    if (redirectedFrom === "myJournal")
      alert("Only for Ghostwriter. Please sign in.");
    if (redirectedFrom === "signin")
      alert("you already access as Ghostwriter.");
  }, [redirectedFrom]);

  return (
    <>
      <Image
        src="/images/Ghostwriter.svg"
        alt="logo_image"
        width={250}
        height={250}
        className="mainLogo"
      />

      <Swiper
        // ✅ 모듈 주입 필수
        modules={[Mousewheel, Scrollbar, Pagination, Keyboard]}
        direction="vertical"
        mousewheel
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true, forceToAxis: true }}
        className="mySwiper"
        // 👇 디버그용: 혹시 렌더는 되는데 스타일 문제인지 확인
        onSwiper={(s) => console.log("swiper: ", s)}
      >
        {/* 디버그 박스: 슬라이드 렌더 확인용 (나중에 지워도 됨) */}
        <SwiperSlide>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0,255,255,0.05)",
            }}
          >
            <Slide01 />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0,255,255,0.05)",
            }}
          >
            <Slide02 />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0,255,255,0.05)",
            }}
          >
            <Slide03 />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "../swiper.css";

const Slide02 = () => {
  const [works, setWorks] = useState([]); // 책 리스트 저장
  const [authors, setAuthors] = useState([]); // 저자 이름 저장 (배열)
  const [coverIds, setCoverIds] = useState([]); // 책 표지 ID 저장 (배열)
  const [descriptions, setDescriptions] = useState([]); // 책 설명 저장 (배열)

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(
          "https://openlibrary.org/trending/weekly.json"
        );
        const data = await response.json();

        if (data && data.works) {
          const firstTwoWorks = data.works.slice(0, 2);
          setWorks(firstTwoWorks);

          const bookPromises = firstTwoWorks.map(async (work, index) => {
            let description = "No description available";
            let author = "Unknown Author";
            let coverId = null;

            try {
              // 책 상세 정보 가져오기
              const workResponse = await fetch(
                `https://openlibrary.org${work.key}.json`
              );
              const workData = await workResponse.json();

              if (workData.description) {
                description =
                  typeof workData.description === "string"
                    ? workData.description
                    : workData.description.value;
              }
            } catch (error) {
              console.error(
                `Error fetching description for ${work.title}:`,
                error
              );
            }

            try {
              // ✅ 저자 정보 가져오기 (authors 배열이 존재하는지 확인 후 가져옴)
              if (work.authors && work.authors.length > 0) {
                const authorKey = work.authors[0]?.key; // 올바르게 key 가져오기

                if (authorKey) {
                  const authorResponse = await fetch(
                    `https://openlibrary.org${authorKey}.json`
                  );
                  const authorData = await authorResponse.json();

                  if (authorData && authorData.name) {
                    author = authorData.name;
                  } else {
                    console.warn(`No name found for author: ${authorKey}`);
                  }
                }
              } else if (work.author_name) {
                // ✅ Open Library의 search API를 통해 저자 정보 가져오기
                author = work.author_name[0] || "Unknown Author";
              }
            } catch (error) {
              console.error(`Error fetching author for ${work.title}:`, error);
            }

            try {
              // 책 표지 가져오기
              const searchResponse = await fetch(
                `https://openlibrary.org/search.json?title=${encodeURIComponent(
                  work.title
                )}`
              );
              const searchData = await searchResponse.json();

              if (searchData.docs && searchData.docs.length > 0) {
                coverId = searchData.docs[0].cover_i;
              }
            } catch (error) {
              console.error(
                `Error fetching cover image for ${work.title}:`,
                error
              );
            }

            return { description, author, coverId };
          });

          // 모든 요청이 완료될 때까지 기다린 후 상태 업데이트
          const results = await Promise.all(bookPromises);

          setDescriptions(results.map((result) => result.description));
          setAuthors(results.map((result) => result.author));
          setCoverIds(results.map((result) => result.coverId));
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, []);

  return (
    <div className="second_slide">
      <div className="description">
        <h3>
          Book of
          <br />
          this month
        </h3>
        <span>Ghost's choice of this month</span>
      </div>

      <Swiper
        scrollbar={{ draggable: true, forceToAxis: true }}
        keyboard={true}
        pagination={true}
        modules={[Scrollbar, Keyboard, Pagination]}
        className="slide2_swiper"
      >
        <Image
          src="/images/darkGhost.svg"
          alt="ghost_image"
          width={250}
          height={250}
          className="dark_ghost"
        />

        {works.map((work, index) => (
          <SwiperSlide key={index}>
            <div className={`book_slide_${index + 1}`}>
              <div className="book_info">
                <h4 className="book_title">{work.title}</h4>
                <span className="book_author">{authors[index]}</span>
                <p className="book_description">
                  {descriptions[index] || "No description available"}
                </p>
              </div>

              <div className="book_img">
                {coverIds[index] ? (
                  <Image
                    src={`https://covers.openlibrary.org/b/id/${coverIds[index]}-L.jpg`}
                    alt={work.title}
                    width={400}
                    height={550}
                  />
                ) : (
                  <p>No Cover Available</p> // 책 표지가 없을 경우 기본 메시지 출력
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide02;

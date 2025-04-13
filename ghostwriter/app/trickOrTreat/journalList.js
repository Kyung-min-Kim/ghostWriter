import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const JournalList = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    // API Route에서 데이터 가져오기
    fetch("/api/getJournal")
      .then((res) => res.json())
      .then((data) => {
        setJournals(data);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // journal.date 문자열을 Date 객체로 변환
    return date.toLocaleDateString("en-US", {
      weekday: "short", // 요일
      day: "2-digit", // 날짜
      month: "short", // 월 (Jun, Jul 형식)
      year: "2-digit", // 연도 (24 형식)
    });
  };

  return (
    <div className="listBox">
      <ul className="listUl">
        {journals.map((journal) => {
          const formattedDate = formatDate(journal.date); // 날짜 변환
          const encodedDate = encodeURIComponent(formattedDate); // URL 인코딩
          const id = journal._id; // URL 인코딩

          return (
            <li key={journal._id} className="listLi">
              <Link
                href={{
                  pathname: `/myJournal/writingJournal/${encodedDate}`,
                  query: { type: "read", id: id },
                }}
              >
                <div>
                  <p
                    className="journalColor"
                    style={{ backgroundColor: journal.colorPicker }}
                  ></p>
                  <p className="journalTitle">{journal.title}</p>
                  <div className="candy_box">
                    <Image
                      src="/images/mint.png"
                      alt="candy"
                      width={20}
                      height={20}
                      className="candy_image"
                    />
                  </div>
                  <p className="candy_num">{journal.candy}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default JournalList;

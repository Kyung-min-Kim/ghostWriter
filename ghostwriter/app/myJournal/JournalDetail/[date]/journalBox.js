import "./writingJournal.css";
import "../../../globals.css";
import Image from "next/image";
import Link from "next/link";
import Video from "next-video";
import ColorPicker from "./colorPicker";
import React, { useState, useEffect } from "react";

const WritingJournal = (req) => {
  const dateString = req.date.date;
  const decodedDate = decodeURIComponent(dateString);
  const parsedDate = new Date(decodedDate);
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const [inputText, setInputText] = useState("");
  const [coverId, setCoverId] = useState("");
  const [author, setAuthor] = useState("");
  const [journalData, setJournalData] = useState([]);

  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const response = await fetch("/api/journalDetail");
        if (!response.ok) {
          throw new Error("Failed to fetch journal data");
        }
        const data = await response.json();
        setJournalData(data);
      } catch (error) {
        console.error("Error fetching journal data:", error);
      }
    };

    fetchJournalData();
  }, []);

  const handleBlur = async (e) => {
    const searchTerm = inputText;
    const encodedTerm = encodeURIComponent(searchTerm).replace(/%20/g, "+");
    // URL에서 데이터 가져오기
    const response1 = await fetch(
      "https://openlibrary.org/search.json?title=" + encodedTerm
    );
    const data = await response1.json();
    const coverId = data.docs[0].cover_i;
    const author = data.docs[0].author_name;
    setCoverId(coverId);
    setAuthor(author);
  };
  const [backgroundColor, setBackgroundColor] = useState("#F5F5F5"); // 초기 배경색 상태

  // 배경색 변경을 처리하는 콜백 함수
  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
    //document.getElementById(journalBox).style.backgroundColor(color.hex);
  };

  return (
    <div>
      <div style={{ backgroundColor: backgroundColor }} className="journalBox">
        <form method="POST" action="/api/journalAdd" className="journalForm">
          <div
            style={{ backgroundColor: backgroundColor }}
            className="writingBox"
          >
            <input type="hidden" id="author" name="author" value={author} />
            <input type="hidden" id="coverId" name="coverId" value={coverId} />
            <input
              type="hidden"
              id="colorPicker"
              name="colorPicker"
              value={backgroundColor}
            />
            <input
              className="date"
              id="date"
              name="date"
              type="text"
              value={formattedDate}
              readOnly={true}
            />
            <input
              className="journalTitle"
              id="title"
              name="title"
              type="text"
              defaultValue="Title"
              required
            />
            <ColorPicker onColorChange={handleColorChange} />
            <input
              className="shareBtn"
              id="shareBtn"
              name="shareBtn"
              type="checkbox"
              defaultChecked={true}
            />
            <span className="checkboxCostume" />
            <label htmlFor="shareBtn" className="shareLabel">
              I like to share my journal
            </label>
            <textarea
              id="context"
              name="context"
              className="journal"
              defaultValue="write your journal!"
            />
            <button className="btnSubmit" type="submit">
              upload
            </button>
          </div>
          <div className="bookBox">
            <input
              className="bookTitle"
              id="bookTitle"
              name="bookTitle"
              type="text"
              defaultValue="book title"
              required
              onChange={(e) => setInputText(e.target.value)}
              onBlur={handleBlur}
            />
            <img
              className="bookCover"
              id="bookCover"
              name="bookCover"
              src={
                coverId
                  ? `https://covers.openlibrary.org/b/id/${coverId}.jpg`
                  : "/placeholder-image.jpg"
              }
              alt="Book Cover"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritingJournal;

"use client";

import "./writingJournal.css";
import "../../../globals.css";
import Image from "next/image";
import Link from "next/link";
import Video from "next-video";
import ColorPicker from "./colorPicker";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const WritingJournal = (props) => {
  const router = useRouter();
  const { data: session } = useSession(); // 로그인 정보 가져오기
  const myEmail = session?.user?.email;
  const decodedDate = decodeURIComponent(props.date.date);
  const type = props.type;
  const id = props.id;

  const parsedDate = new Date(decodedDate);
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const [typeReady, setTypeReady] = useState(false);

  useEffect(() => {
    if (type !== null && type !== undefined) {
      setTypeReady(true);
    }
  }, [type]);

  //신규
  const [inputText, setInputText] = useState("");
  const [coverId, setCoverId] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(null); // 초기 배경색 상태
  const [journalData, setJournalData] = useState(null);
  const [titleValue, setTitleValue] = useState("title");
  const [contextValue, setContextValue] = useState("write your journal!");

  //수정
  const [formData, setFormData] = useState({
    title: journalData?.title || "", // undefined일 경우 빈 문자열로 초기화
    context: journalData?.context || "",
    bookTitle: journalData?.bookTitle || "",
    coverId: journalData?.coverId || "",
    author: journalData?.author || "",
    email: journalData?.email || "",
    colorPicker: journalData?.colorPicker || "",
    bookTitle: journalData?.bookTitle || "book title",
    candy: journalData?.candy || "0",
  });

  useEffect(() => {
    // journalData가 바뀔 때 상태를 업데이트
    if (journalData) {
      setFormData({
        title: journalData.title,
        context: journalData.context,
        bookTitle: journalData.bookTitle,
        coverId: journalData.coverId,
        author: journalData.author,
        colorPicker: journalData.colorPicker,
        bookTitle: journalData.bookTitle,
        email: journalData.email,
        candy: journalData.candy,
      });
    }
  }, [journalData]); // journalData가 변경될 때만 실행

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState, // 기존 상태 유지
      [name]: value, // 해당 필드만 업데이트
    }));
  };

  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const response = await fetch(
          `/api/journalDetail?date=${formattedDate}&type=${type}&id=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch journal data");
        }
        const data = await response.json();
        setJournalData(data);
        setBackgroundColor(data.colorPicker || "#F5F5F5");
      } catch (error) {
        console.error("Error fetching journal data:", error);
      }
    };

    fetchJournalData();
  }, [decodedDate]);

  const handleBlur = async () => {
    const searchTerm = formData.bookTitle; // bookTitle을 사용
    const encodedTerm = encodeURIComponent(searchTerm).replace(/%20/g, "+");
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?title=" + encodedTerm
      );
      const data = await response.json();
      if (data.docs && data.docs.length > 0) {
        const newCoverId = data.docs[0].cover_i;
        const newAuthor = data.docs[0].author_name
          ? data.docs[0].author_name[0]
          : "Unknown"; // 저자 이름 가져오기
        setFormData((prevState) => ({
          ...prevState,
          coverId: newCoverId, // coverId 업데이트
          author: newAuthor, // author 업데이트
        }));
      } else {
        alert("No book cover found.");
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  // 배경색 변경을 처리하는 콜백 함수
  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
    //document.getElementById(journalBox).style.backgroundColor(color.hex);
  };

  const handleFocus = (value) => {
    if (value == "title") {
      setTitleValue(""); // 포커스가 잡히면 값이 'title'일 때만 지우기
    }
    if (value == "context") {
      setContextValue("");
    }
    if (value == "bookTitle") {
      setBookValue("");
    }
  };

  //사탕
  const handlePutCandy = async () => {
    try {
      const response = await fetch("/api/addCandy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // ObjectId로 넘기기
      });

      if (response.status === 409) {
        const data = await response.json();
        alert(data.message);
        return;
      }

      if (!response.ok) throw new Error("Candy update failed");

      const updated = await response.json();
      setFormData((prev) => ({
        ...prev,
        candy: updated.candy,
      }));
    } catch (err) {
      console.error("Failed to add candy:", err);
    }
  };

  return (
    <div>
      {journalData ? (
        //update
        <div
          style={{ backgroundColor: backgroundColor }}
          className="journalBox"
        >
          <form
            method="POST"
            action="/api/journalUpdate"
            className="journalForm"
          >
            <div
              style={{ backgroundColor: backgroundColor }}
              className="writingBox"
            >
              <input
                type="hidden"
                id="author"
                name="author"
                //value={author}
                value={formData.author} // 상태에서 context를 불러옴
                onChange={handleChange} // 값 변경 시 상태 업데이트
              />
              <input
                type="hidden"
                id="coverId"
                name="coverId"
                value={formData.coverId} // 상태에서 context를 불러옴
                onChange={handleChange} // 값 변경 시 상태 업데이트
                //defaultValue={journalData.coverId}
              />
              <input
                type="hidden"
                id="colorPicker"
                name="colorPicker"
                value={formData.colorPicker} // 상태에서 context를 불러옴
                onChange={handleChange} // 값 변경 시 상태 업데이트
                //defaultValue={journalData.ColorPicker}
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
                value={formData.title} // 상태에서 context를 불러옴
                onChange={handleChange} // 값 변경 시 상태 업데이트
                required
              />
              <ColorPicker onColorChange={handleColorChange} />
              <input
                className="shareBtn"
                id="shareBtn"
                name="shareBtn"
                type="checkbox"
                defaultChecked={journalData.shareBtn == "on" ? true : false}
              />
              <span className="checkboxCostume" />
              <label htmlFor="shareBtn" className="shareLabel">
                I like to share my journal
              </label>
              <span className="candyBox">
                <Image
                  src="/images/mint.png"
                  alt="candy"
                  width={20}
                  height={20}
                  className="candy_image"
                />
                <input
                  className="candy"
                  id="candy"
                  name="candy"
                  type="text"
                  readOnly={true}
                  value={formData.candy}
                />
              </span>
              <textarea
                id="context"
                name="context"
                className="journal"
                value={formData.context} // 상태에서 context를 불러옴
                onChange={handleChange} // 값 변경 시 상태 업데이트
              />
              {type == "read" && formData.email != myEmail ? (
                <button
                  className="btnSubmit"
                  type="button"
                  onClick={async () => {
                    await handlePutCandy();
                    router.push("/trickOrTreat");
                  }}
                >
                  put candy
                </button>
              ) : type != "read" && formData.email == myEmail ? (
                <button className="btnSubmit" type="submit">
                  upload
                </button>
              ) : null}
            </div>
            <div className="bookBox">
              <input
                className="bookTitle"
                id="bookTitle"
                name="bookTitle"
                type="text"
                value={formData.bookTitle} // 상태에서 context를 불러옴
                onChange={handleChange} // 값 변경 시 상태 업데이트
                onBlur={handleBlur}
                required
              />
              <img
                className="bookCover"
                id="bookCover"
                name="bookCover"
                src={
                  formData.coverId
                    ? `https://covers.openlibrary.org/b/id/${formData.coverId}.jpg`
                    : "images/placeholder-image.jpg"
                }
                alt="Book Cover"
              />
            </div>
          </form>
        </div>
      ) : (
        // new
        <div
          style={{ backgroundColor: backgroundColor }}
          className="journalBox"
        >
          <form method="POST" action="/api/journalAdd" className="journalForm">
            <div
              style={{ backgroundColor: backgroundColor }}
              className="writingBox"
            >
              <input type="hidden" id="author" name="author" value={author} />
              <input
                type="hidden"
                id="coverId"
                name="coverId"
                value={coverId}
              />
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
                //defaultValue="Title"
                value={titleValue}
                onFocus={() => handleFocus("title")} // 포커스가 잡혔을 때 호출
                onChange={(e) => setTitleValue(e.target.value)} // 입력값이 변경될 때 호출
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
              <span className="candyBox">
                <Image
                  src="/images/mint.png"
                  alt="candy"
                  width={20}
                  height={20}
                  className="candy_image"
                />
                <input
                  className="candy"
                  id="candy"
                  name="candy"
                  type="text"
                  readOnly={true}
                  value={formData.candy}
                />
              </span>
              <textarea
                id="context"
                name="context"
                className="journal"
                value={contextValue}
                onFocus={() => handleFocus("context")} // 포커스가 잡혔을 때 호출
                onChange={(e) => setContextValue(e.target.value)} // 입력값이 변경될 때 호출
                required
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
                value={formData.bookTitle}
                //defaultValue="book title"
                //onFocus={() => handleFocus("bookTitle")} // 포커스가 잡혔을 때 호출
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <img
                className="bookCover"
                id="bookCover"
                name="bookCover"
                src={
                  formData.coverId
                    ? `https://covers.openlibrary.org/b/id/${formData.coverId}.jpg`
                    : "images/placeholder-image.jpg"
                }
                alt="Book Cover"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WritingJournal;

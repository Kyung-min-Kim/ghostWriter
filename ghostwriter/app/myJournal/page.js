"use client";

import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./myJournal.css";
import { getSession } from "next-auth/react";

import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import { useRouter } from "next/navigation";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

  const [journalData, setJournalData] = useState([]);
  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const response = await fetch("/api/journalList");
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

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start"></div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end"></div>
      </div>
    );
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const dateFormat2 = "EEEE";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const hasJournalEntry = journalData.some((entry) => {
          const entryDate = new Date(entry.date);
          return isSameDay(entryDate, cloneDay);
        });
        const journalEntry = journalData.find((entry) => {
          const entryDate = new Date(entry.date);
          return isSameDay(entryDate, cloneDay);
        });

        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <div className="date">
              <span className="number">{formattedDate}</span>
              <span className="days">
                {format(addDays(startDate, i), dateFormat2)}
              </span>
              {hasJournalEntry && (
                <div
                  className="journal-entry-indicator"
                  style={{ backgroundColor: journalEntry.colorPicker }}
                  onClick={() => {
                    const dayStr = format(cloneDay, "ccc dd MMM yy");
                    onJournalLiskHandle(cloneDay, dayStr);
                  }}
                >
                  <div className="image-preview">
                    <img
                      className="bookCoverLst"
                      id="bookCover"
                      name="bookCover"
                      src={`https://covers.openlibrary.org/b/id/${journalEntry.coverId}-M.jpg`}
                      alt="Book Cover"
                      onClick={() => {
                        const dayStr = format(cloneDay, "ccc dd MMM yy");
                        onJournalLiskHandle(cloneDay, dayStr);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  //writingJournal
  const showDetailsHandle = (day) => {
    router.push("/myJournal/writingJournal/" + day);
  };

  //JounralList
  const onJournalLiskHandle = (day) => {
    router.push("/myJournal/journalDetail/" + day);
  };

  const renderWeek = () => {
    return (
      <div className="header rowBottom flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => changeWeekHandle("prev")}>
            prev week
          </div>
        </div>
        <div className="col col-end" onClick={() => changeWeekHandle("next")}>
          <div className="icon">next week</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Link href="/">
        <Image
          src="/images/Ghostwriter.svg"
          alt="logo_image"
          width={250}
          height={250}
          className="logo"
        />
      </Link>
      <div className="calendar-box">
        <h4 className="title">My Reading Journal</h4>
        <div className="calendar">
          {renderWeek()}
          {renderHeader()}
          {renderCells()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

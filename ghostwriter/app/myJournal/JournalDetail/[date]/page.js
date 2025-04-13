"use client";
import React from "react";
import "./writingJournal.css";
import "../../../globals.css";
import Image from "next/image";
import Link from "next/link";
import Video from "next-video";
import JournalBox from "./journalBox.js";
import { useParams } from "next/navigation";

const WritingJournal = () => {
  const params = useParams();
  return (
    <div>
      <Link href="/">
        <Image
          src="../../../../images/Ghostwriter.svg"
          alt="logo_image"
          width={250}
          height={250}
          className="logo"
        />
      </Link>
      <JournalBox date={params} />
    </div>
  );
};

export default WritingJournal;

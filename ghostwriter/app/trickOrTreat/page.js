"use client";
import React from "react";
import "./trickOrTreat.css";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import Video from "next-video";
import JournalList from "./journalList.js";

const TrickorTreat = () => {
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
      <div className="main-box">
        <h4 className="title">Trick or Treat</h4>
        <h3 className="sub-title">put your candy to ghost!</h3>
        <Image
          src="/images/mint.png"
          alt="candy"
          width={25}
          height={25}
          className="candy-image"
        />
        <div className="candy"></div>
        <JournalList></JournalList>
      </div>
    </div>
  );
};

export default TrickorTreat;

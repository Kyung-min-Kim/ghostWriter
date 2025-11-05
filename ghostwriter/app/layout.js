import "./layout.css";
import "./swiper.css";
import "react-calendar/dist/Calendar.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout"; // 새로 만들 클라이언트 래퍼

const inter = Inter({ subsets: ["latin"] });

// (선택) 메타데이터가 있다면 유지
export const metadata = {
  title: "ghostwriter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 클라이언트 로직은 전부 여기 안의 ClientLayout으로 이동 */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

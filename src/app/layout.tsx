import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getChannels } from "../actions/Actions";
import ChannelBar from "./components/channel/ChannelBar";
import { TbMenu2 } from "react-icons/tb";
import { StoreProvider } from "@/store/StoreProvider";
import SubjectBar from "./components/subject/SubjectBar";
import ThemeSelector from "./themeSelector";
import StoreProvider2 from "@/store/StoreProvider2";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Work Ally! Your Daily Guide or Rubber duck in Work",
  description: "Your Daily Guide or Rubber duck in Work. I am here when you stuck or just need a usefull tool (;",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const ChannelList = await getChannels();  

  return (
    <StoreProvider>
      <StoreProvider2>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="drawer lg:drawer-open">
            <input id="channel-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center bg-base-100 text-base-content">
              <label htmlFor="channel-drawer" className="btn btn-primary drawer-button lg:hidden fixed top-4 left-4 h-8 w-8 p-0 text-xl">
                <TbMenu2 />
              </label>
              <div className="fixed top-4 right-4 flex gap-2 z-10">
                <select defaultValue="java" className="select select-secondary">
                  <option disabled={true}>Pick a Language</option>
                  <option value="java">Java</option>
                  <option value="python" disabled={true}>Python</option>
                  <option value="javascript" disabled={true}>JavaScript</option>
                </select>
                <ThemeSelector />
              </div>
              {children}
            </div>
            <div className="drawer-side">
              <label htmlFor="channel-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex h-full">
                  <ChannelBar key={"ChannelBar"} ChannelList={ChannelList} />
                  <SubjectBar />
                </div>
            </div>
          </div>
        </body>
      </StoreProvider2>
    </StoreProvider>
  );
}

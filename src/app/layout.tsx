"use server";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {useDispatch} from "react-redux"
import { addChannelReducer } from "./slice";
import { getChannels } from "./actions/Actions";
import ChannelBar from "./components/channel/ChannelBar";
import { Head } from "next/document";

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
  console.log(ChannelList);
  const dispatch = useDispatch();
  dispatch(addChannelReducer(ChannelList));

  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="App" className="flex h-screen overflow-hidden">
          <ChannelBar ChannelList={ChannelList} />
          <div className="channelContent w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}

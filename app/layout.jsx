import { Inter } from "next/font/google";
import "./globals.css";
import ChatBotWrapper from "@/components/ChatBotWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Frieren",
  description: "Transform your vision into a stunning digital experience. Custom websites, admin panels, authentication, and payment integration - all crafted with excellence.",
  keywords: ["web development", "website design", "admin panel", "custom website", "Next.js", "React"],
  authors: [{ name: "Frieren" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Frieren",
    description: "Transform your vision into a stunning digital experience.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
        <ChatBotWrapper />
      </body>
    </html>
  );
}

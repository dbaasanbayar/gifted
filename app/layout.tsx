
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./_component/header";
import { NavigationProvider } from "./context/screen-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <NavigationProvider>
            <div className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
              <Header />
              {children}
            </div>
            </NavigationProvider>
          </body>
        </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DBiz Employee Management System",
  description: "Sample application which deals with employee management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
          <div className="w-full max-w-5xl lg:min-h-[70vh] bg-slate-900 text-slate-100 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">

            <div className="w-full lg:w-1/2 px-8 sm:px-10 py-10 flex flex-col justify-center">
              {/* LEFT: form */}
              {children}
            </div>

            {/* RIGHT: image */}
            <div className="relative w-full lg:w-1/2 h-64 lg:h-auto hidden lg:block">
              <img
                src="https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg"
                alt="Desk"
                className="h-full w-full object-cover hidden lg:block"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/20 to-slate-900/0" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

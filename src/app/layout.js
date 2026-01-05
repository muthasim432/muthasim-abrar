"use client";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Muthasim Abrar - Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer & AI Solutions Builder. Available for full-time opportunities and freelance projects." />
      </head>
      <body className={`${inter.variable} antialiased`} style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}

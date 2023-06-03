"use client"
import "../styles/globals.scss"
export const metadata = {
  title: "online store",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

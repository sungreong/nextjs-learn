import { Metadata } from 'next'

export const metadata:Metadata = {
  title: {
    template: '%s | Next Movies',
    default: "Next Movies"
  },
  description: 'Generated by Next.js',
}
import Navigation from "../components/navigation"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
        </body>
    </html>
  )
}

import "./globals.css"
// ---------------------Libs---------------------
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { siteConfig } from "@/config/site"
// ---------------------Providers---------------------
import AuthProvider from "@/providers/AuthProvider"
import ToasterProvider from "@/providers/ToasterProvider"
import NextTopLoader from "nextjs-toploader"
// ---------------------Components---------------------
import Navbar from "@/components/Nav/Navbar"
import Footer from "@/components/Footer/Footer"

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.authorName,
      url: siteConfig.authorURL,
    },
  ],
  creator: siteConfig.authorName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: siteConfig.authorName,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        <ToasterProvider />
        <Navbar session={session} />

        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  )
}

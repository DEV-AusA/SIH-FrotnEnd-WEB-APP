import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/components/UserProvider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CompaniesBanner from "@/components/companiesBanner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secure Ingress Home",
  description: "Secure Ingress Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId="651220245380-9ka4dug85joldqc4r26turbqm1dvmpkg.apps.googleusercontent.com">
      <html lang="en">
        <head>
          <link rel="icon" href="/sih.ico" />
        </head>
        <body className={inter.className}>
          <UserProvider>
            <Header />
            {children}
            <CompaniesBanner />
            <Footer />
            <ToastContainer />
          </UserProvider>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}

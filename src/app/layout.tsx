import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layoutWrapper";
import UserProvider from "@/context/admin_context";

export const metadata: Metadata = {
  title: "AxcelMart",
  description: "Ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </UserProvider>
    </html>
  );
}

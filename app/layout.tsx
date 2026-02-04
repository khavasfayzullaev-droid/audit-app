import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for now, can switch to custom font later
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Marketing & Finance Audit",
    description: "Automated business audit and planning tool",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}

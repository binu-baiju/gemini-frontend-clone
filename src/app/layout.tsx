import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/utils/theme-providers";
import { Toaster } from "sonner";
const OutfitFont = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gemini Clone Assignment",
  description: "A Gemini-inspired AI assistant built with Next.js",
  keywords: ["AI", "assistant", "Gemini", "clone", "Next.js"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name or Company",
  publisher: "Your Name or Company",
  openGraph: {
    title: "Gemini Clone Assignment",
    description:
      "An advanced GEMINI Clone built with Next.js, featuring enhanced functionalities and faster response times.",

    siteName: "Gemini Clone Assignment",
    images: [
      {
        url: "/assets/gemini-banner.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gemini Clone Assignment",
    description:
      "Experience the power of AI with our Gemini-inspired assistant",
    creator: "@yourTwitterHandle",
    images: ["/assets/gemini-banner.png"],
  },
  metadataBase: new URL("http://localhost:3000"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${OutfitFont.className} dark:bg-[#131314] h-dvh w-full overflow-hidden bg-white text-black dark:text-white`}
      >
        <ThemeProviders>
          <div className="h-full w-full">{children}</div>
        </ThemeProviders>

        <Toaster />
      </body>
    </html>
  );
}

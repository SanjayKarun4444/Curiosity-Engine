import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/ui/Sidebar";
import StarsBackground from "@/components/ui/StarsBackground";

export const metadata: Metadata = {
  title: "Curiosity Engine - Explore the World Like Da Vinci",
  description:
    "A daily intellectual discovery engine inspired by Leonardo Da Vinci. Explore ideas, build knowledge graphs, and follow your curiosity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-foreground" style={{ background: "#050A14" }}>
        <StarsBackground />
        <div className="flex min-h-screen relative z-10">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

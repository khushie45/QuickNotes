import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import Navbar from "@/components/Navbar";
import { NotesProvider } from "@/context/NotesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quick Notes",
  description: "Simple note-taking app with user authentication.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NotesProvider>
            <Navbar />
            {children}
          </NotesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

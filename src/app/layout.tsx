'use client';

import "@/styles/globals.css";
import { ReduxProvider } from "@/redux/provider";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);
  return <div className={darkMode ? "dark" : ""}>{children}</div>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}

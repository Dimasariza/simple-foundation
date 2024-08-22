"use client";

import { Inter } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { persistor, store } from "./redux/root";
import { lato } from "./utils/font";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const value = {
    // unstyled: true,
    // pt: Tailwind,
    locale: 'es',
  }

  return (
    <html lang="en">
      <body className={`${inter.className} ${lato} bg-primary-maingray`}>
        <PrimeReactProvider value={value}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <main className="font-lato">{children}</main>
            </PersistGate>
          </Provider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}

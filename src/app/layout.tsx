import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';

import ResponsiveContainer from '@/components/ResponsiveContainer';
import { getInitialViewport } from '@/utils/viewport';
import { UserProvider } from '@/contexts/UserContext';

import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialWidth = await getInitialViewport();
  return (
    <html lang="ko" suppressHydrationWarning className={`${pretendard.variable}`}>
      <body>
        <ThemeProvider attribute="class">
          <UserProvider>
            <ResponsiveContainer initialWidth={initialWidth}>{children}</ResponsiveContainer>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

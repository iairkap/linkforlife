import './globals.css'
import { Providers } from './providers'
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata = {
  title: 'Manage your wedding - Weddinvitation',
  description: 'Weddinvitation is a platfor that helps you to plan and manage your wedding, with our dashboard you can manage your guest list, send invitations, and track RSVPs.',
}

export default function RootLayout({
  children,
  params: { locale }

}: {
  children: React.ReactNode
  params: { locale: string };

}) {


  const messages = useMessages();
  return (
    <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <body>
          <Providers>{children}</Providers>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
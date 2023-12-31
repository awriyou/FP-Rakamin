import { Inter } from 'next/font/google';
import './styles/globals.css';
import Navigation from './components/Navigation.jsx';
// import NavigationBar from './components/NavigationBar'
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PureCompute',
  description: 'Generated by create next app',
  icons: {
    icons: [
      '/favicon.ico?v=4',
    ],
    apple: [
      '/apple-touch-icon.png?v=4',
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navigation />

        {children}
      </body>
    </html>
  );
}

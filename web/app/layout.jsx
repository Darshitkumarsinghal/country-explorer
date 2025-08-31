// web/app/layout.jsx
import './globals.css';

export const metadata = { title: 'Country Explorer' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main style={{minHeight: '100vh', background: 'linear-gradient(180deg,#e6eefc,#fff)'}}>
          {children}
        </main>
      </body>
    </html>
  );
}

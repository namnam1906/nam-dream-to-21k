import './globals.css';

export const metadata = {
  title: 'Road to ATM 2026',
  description: 'Jarinya Half Marathon Race Book & Training Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

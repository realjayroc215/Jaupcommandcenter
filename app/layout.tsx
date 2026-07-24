import './globals.css';
import Sidebar from '../components/Sidebar';
import AppDock from '../components/AppDock';
import TopBar from '../components/TopBar';

export const metadata = {
  title: 'J-A-U-P Command Center',
  description: 'Apex Lion J-A-U-P Hub'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-apex-black text-apex-gold">
        <div className="min-h-screen flex flex-col">
          <TopBar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 overflow-y-auto">
              {children}
            </main>
            <AppDock />
          </div>
        </div>
      </body>
    </html>
  );
}

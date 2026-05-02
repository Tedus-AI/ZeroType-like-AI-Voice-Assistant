import { useState } from 'react';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [page, setPage] = useState<'home' | 'settings' | 'history'>('home');

  return (
    <main>
      <header>
        <h1>AI Voice Assistant</h1>
        <nav>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('settings')}>Settings</button>
          <button onClick={() => setPage('history')}>History</button>
        </nav>
      </header>
      {page === 'home' && <HomePage />}
      {page === 'settings' && <SettingsPage />}
      {page === 'history' && <HistoryPage />}
    </main>
  );
}

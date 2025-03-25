import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Blocks from './pages/Blocks';
import Transactions from './pages/Transactions';
import TransactionDetail from './pages/TransactionDetail';
import Accounts from './pages/Accounts';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/blocks/:hash" element={<Blocks />} />
          <Route path="/blocks/by-nonce/:nonce" element={<Blocks />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:hash" element={<TransactionDetail />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:address" element={<Accounts />} />
        </Routes>
      </main>
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-text-secondary">
            © 2024 Degen Sentinels. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/thepablosantos" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/pablo-santos-46794a269/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary">
              LinkedIn
            </a>
            <a href="/docs" className="text-text-secondary hover:text-text-primary">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
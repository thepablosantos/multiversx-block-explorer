import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blocks from './pages/Blocks';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Validators from './pages/Validators';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blocks" element={<Blocks />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="validators" element={<Validators />} />
      </Route>
    </Routes>
  );
}

export default App;